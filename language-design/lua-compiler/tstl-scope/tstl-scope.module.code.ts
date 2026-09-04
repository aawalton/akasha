import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { getSymbolInfo } from "../tstl-symbols/tstl-symbols.module.code.ts"
import {
  findFirstNodeAbove,
  getFirstDeclarationInFile,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
import { assert, isNonNull } from "../tstl-utils/tstl-utils.module.code.ts"

export const ScopeType = {
  File: 1 << 0,
  Function: 1 << 1,
  Switch: 1 << 2,
  Loop: 1 << 3,
  Conditional: 1 << 4,
  Block: 1 << 5,
  Try: 1 << 6,
  Catch: 1 << 7,
  LoopInitializer: 1 << 8,
} as const
export type ScopeType = number

interface FunctionDefinitionInfo {
  referencedSymbols: Map<luaCore.SymbolId, ts.Node[]>
  definition?: luaStatements.VariableDeclarationStatement | luaStatements.AssignmentStatement
}

export const LoopContinued = {
  WithGoto: 0,
  WithRepeatBreak: 1,
  WithContinue: 2,
} as const
export type LoopContinued = (typeof LoopContinued)[keyof typeof LoopContinued]

export interface Scope {
  type: ScopeType
  id: number
  node: ts.Node
  referencedSymbols?: Map<luaCore.SymbolId, ts.Node[]>
  variableDeclarations?: readonly luaStatements.VariableDeclarationStatement[]
  functionDefinitions?: Map<luaCore.SymbolId, FunctionDefinitionInfo>
  importStatements?: readonly luaStatements.Statement[]
  loopContinued?: LoopContinued
  functionReturned?: boolean
}

export interface HoistingResult {
  statements: readonly luaStatements.Statement[]
  hoistedStatements: readonly luaStatements.Statement[]
  hoistedIdentifiers: readonly luaExpressions.Identifier[]
}

export function* walkScopesUp(context: TransformationContext): IterableIterator<Scope> {
  const scopeStack = context.scopeStack
  for (let i = scopeStack.length - 1; i >= 0; --i) {
    const scope = scopeStack[i]
    if (scope === undefined) continue
    yield scope
  }
}

export function peekScope(context: TransformationContext): Scope {
  const scopeStack = context.scopeStack
  const scope = scopeStack[scopeStack.length - 1]
  assert(scope)

  return scope
}

export function findScope(
  context: TransformationContext,
  scopeTypes: ScopeType
): Scope | undefined {
  for (let i = context.scopeStack.length - 1; i >= 0; --i) {
    const scope = context.scopeStack[i]
    if (scope !== undefined && (scopeTypes & scope.type) !== 0) {
      return scope
    }
  }
}

export function addScopeVariableDeclaration(
  scope: Scope,
  declaration: luaStatements.VariableDeclarationStatement
) {
  scope.variableDeclarations = [...(scope.variableDeclarations ?? []), declaration]
}

function isHoistableFunctionDeclaredInScope(symbol: ts.Symbol, scopeNode: ts.Node) {
  return symbol?.declarations?.some(
    (d) =>
      ts.isFunctionDeclaration(d) && findFirstNodeAbove(d, (n): n is ts.Node => n === scopeNode)
  )
}

export function hasReferencedUndefinedLocalFunction(context: TransformationContext, scope: Scope) {
  if (!scope.referencedSymbols) {
    return false
  }
  for (const [symbolId, nodes] of scope.referencedSymbols) {
    const [firstNode] = nodes
    if (firstNode === undefined) continue
    const type = context.checker.getTypeAtLocation(firstNode)
    if (
      !scope.functionDefinitions?.has(symbolId) &&
      type.getCallSignatures().length > 0 &&
      isHoistableFunctionDeclaredInScope(type.symbol, scope.node)
    ) {
      return true
    }
  }
  return false
}

export function hasReferencedSymbol(
  context: TransformationContext,
  scope: Scope,
  symbol: ts.Symbol
) {
  if (!scope.referencedSymbols) {
    return
  }
  for (const nodes of scope.referencedSymbols.values()) {
    if (nodes.some((node) => context.checker.getSymbolAtLocation(node) === symbol)) {
      return true
    }
  }
  return false
}

export function separateHoistedStatements(
  context: TransformationContext,
  statements: readonly luaStatements.Statement[]
): HoistingResult {
  const scope = peekScope(context)
  const allHoistedStatments: luaStatements.Statement[] = []
  const allHoistedIdentifiers: luaExpressions.Identifier[] = []

  let { unhoistedStatements, hoistedStatements, hoistedIdentifiers } = hoistFunctionDefinitions(
    context,
    scope,
    statements
  )
  allHoistedStatments.push(...hoistedStatements)
  allHoistedIdentifiers.push(...hoistedIdentifiers)

  ;({ unhoistedStatements, hoistedIdentifiers } = hoistVariableDeclarations(
    context,
    scope,
    unhoistedStatements
  ))
  allHoistedIdentifiers.push(...hoistedIdentifiers)

  ;({ unhoistedStatements, hoistedStatements } = hoistImportStatements(scope, unhoistedStatements))
  allHoistedStatments.unshift(...hoistedStatements)

  return {
    statements: unhoistedStatements,
    hoistedStatements: allHoistedStatments,
    hoistedIdentifiers: allHoistedIdentifiers,
  }
}

export function performHoisting(
  context: TransformationContext,
  statements: readonly luaStatements.Statement[]
): readonly luaStatements.Statement[] {
  const result = separateHoistedStatements(context, statements)
  const modifiedStatements = [...result.hoistedStatements, ...result.statements]
  if (result.hoistedIdentifiers.length > 0) {
    modifiedStatements.unshift(
      luaStatements.createVariableDeclarationStatement(result.hoistedIdentifiers)
    )
  }
  return modifiedStatements
}

function shouldHoistSymbol(
  context: TransformationContext,
  symbolId: luaCore.SymbolId,
  scope: Scope
): boolean {
  if (scope.type === ScopeType.Switch) {
    return true
  }

  const symbolInfo = getSymbolInfo(context, symbolId)
  if (!symbolInfo) {
    return false
  }

  const declaration = getFirstDeclarationInFile(symbolInfo.symbol, context.sourceFile)
  if (!declaration) {
    return false
  }

  if (symbolInfo.firstSeenAtPos < declaration.pos) {
    return true
  }

  if (scope.functionDefinitions) {
    for (const [functionSymbolId, functionDefinition] of scope.functionDefinitions) {
      assert(functionDefinition.definition)

      const { line, column } = luaCore.getOriginalPos(functionDefinition.definition)
      if (line !== undefined && column !== undefined) {
        const definitionPos = ts.getPositionOfLineAndCharacter(context.sourceFile, line, column)
        if (
          functionSymbolId !== symbolId &&
          declaration.pos < definitionPos &&
          functionDefinition.referencedSymbols.has(symbolId) &&
          shouldHoistSymbol(context, functionSymbolId, scope)
        ) {
          return true
        }
      }
    }
  }

  return false
}

function hoistVariableDeclarations(
  context: TransformationContext,
  scope: Scope,
  statements: readonly luaStatements.Statement[]
): {
  unhoistedStatements: readonly luaStatements.Statement[]
  hoistedIdentifiers: readonly luaExpressions.Identifier[]
} {
  if (!scope.variableDeclarations) {
    return { unhoistedStatements: statements, hoistedIdentifiers: [] }
  }

  const unhoistedStatements = [...statements]
  const hoistedIdentifiers: luaExpressions.Identifier[] = []
  for (const declaration of scope.variableDeclarations) {
    const symbols = declaration.left.map((i) => i.symbolId).filter(isNonNull)
    if (symbols.some((s) => shouldHoistSymbol(context, s, scope))) {
      const index = unhoistedStatements.indexOf(declaration)
      if (index < 0) {
        continue
      }

      if (declaration.right) {
        const assignment = luaStatements.createAssignmentStatement(
          declaration.left,
          declaration.right
        )
        luaCore.setNodePosition(assignment, declaration)
        unhoistedStatements.splice(index, 1, assignment)
      } else {
        unhoistedStatements.splice(index, 1)
      }

      hoistedIdentifiers.push(...declaration.left)
    }
  }

  return { unhoistedStatements, hoistedIdentifiers }
}

function hoistFunctionDefinitions(
  context: TransformationContext,
  scope: Scope,
  statements: readonly luaStatements.Statement[]
): {
  unhoistedStatements: readonly luaStatements.Statement[]
  hoistedStatements: readonly luaStatements.Statement[]
  hoistedIdentifiers: readonly luaExpressions.Identifier[]
} {
  if (!scope.functionDefinitions) {
    return { unhoistedStatements: statements, hoistedStatements: [], hoistedIdentifiers: [] }
  }

  const unhoistedStatements = [...statements]
  const hoistedStatements: luaStatements.Statement[] = []
  const hoistedIdentifiers: luaExpressions.Identifier[] = []
  for (const [functionSymbolId, functionDefinition] of scope.functionDefinitions) {
    assert(functionDefinition.definition)

    if (shouldHoistSymbol(context, functionSymbolId, scope)) {
      const index = unhoistedStatements.indexOf(functionDefinition.definition)
      if (index < 0) {
        continue
      }
      unhoistedStatements.splice(index, 1)

      if (luaStatements.isVariableDeclarationStatement(functionDefinition.definition)) {
        assert(functionDefinition.definition.right)
        hoistedIdentifiers.push(...functionDefinition.definition.left)
        hoistedStatements.push(
          luaStatements.createAssignmentStatement(
            functionDefinition.definition.left,
            functionDefinition.definition.right
          )
        )
      } else {
        hoistedStatements.push(functionDefinition.definition)
      }
    }
  }

  return { unhoistedStatements, hoistedStatements, hoistedIdentifiers }
}

function hoistImportStatements(
  scope: Scope,
  statements: readonly luaStatements.Statement[]
): {
  unhoistedStatements: readonly luaStatements.Statement[]
  hoistedStatements: readonly luaStatements.Statement[]
} {
  return { unhoistedStatements: statements, hoistedStatements: scope.importStatements ?? [] }
}
