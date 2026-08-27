import ts from "typescript"
import {
  type Ctx,
  DIRECT_IO_MODULES,
  NEW_BUILTINS,
  pushFinding,
  THROW_ERROR_CTORS,
} from "./forbidden-ctx"

export function checkCallExpression(node: ts.CallExpression, ctx: Ctx): undefined {
  const callee = node.expression

  if (ts.isIdentifier(callee) && callee.text === "fetch") {
    pushFinding(
      node,
      "directIO",
      "direct call to global `fetch` is forbidden — every effect goes through ctx",
      ctx
    )
    return
  }

  if (!ts.isPropertyAccessExpression(callee)) return

  const propName = callee.name.text
  const objText = callee.expression.getText(ctx.sf)

  if (objText === "Promise") {
    if (propName === "all") {
      pushFinding(
        node,
        "promiseAll",
        "Promise.all is forbidden — plpgsql cannot express concurrent transactions",
        ctx
      )
      return
    }
    if (propName === "race") {
      pushFinding(
        node,
        "promiseRace",
        "Promise.race is forbidden — plpgsql cannot express concurrent transactions",
        ctx
      )
      return
    }
    if (propName === "allSettled") {
      pushFinding(
        node,
        "promiseAllSettled",
        "Promise.allSettled is forbidden — plpgsql cannot express concurrent transactions",
        ctx
      )
      return
    }
  }

  if (propName === "replaceAll") {
    const allLiteral = node.arguments.every(
      (a) => ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a)
    )
    if (!allLiteral || node.arguments.length === 0) {
      pushFinding(
        node,
        "replaceAll",
        "String.prototype.replaceAll is forbidden unless both arguments are string literals — plpgsql `replace` is global, so the literal form lowers cleanly; non-literal forms must use indexOf-loop or regexp_replace explicitly",
        ctx
      )
      return
    }
  }

  if (propName === "forEach" && node.arguments.length >= 1) {
    const cb = node.arguments[0]
    if (cb !== undefined && (ts.isArrowFunction(cb) || ts.isFunctionExpression(cb))) {
      if (callbackContainsReturn(cb)) {
        pushFinding(
          node,
          "forEachWithReturn",
          "Array.prototype.forEach with `return` inside callback is forbidden — use `for...of` + break",
          ctx
        )
      }
    }
  }
}

function callbackContainsReturn(fn: ts.ArrowFunction | ts.FunctionExpression): boolean {
  const body = fn.body
  if (ts.isBlock(body)) {
    return blockContainsReturn(body)
  }
  return false
}

function blockContainsReturn(node: ts.Node): boolean {
  let found = false
  const walk = (n: ts.Node): undefined => {
    if (found) return
    if (ts.isReturnStatement(n)) {
      found = true
      return
    }
    if (
      ts.isFunctionDeclaration(n) ||
      ts.isFunctionExpression(n) ||
      ts.isArrowFunction(n) ||
      ts.isMethodDeclaration(n)
    ) {
      return
    }
    ts.forEachChild(n, walk)
  }
  ts.forEachChild(node, walk)
  return found
}

export function checkNewExpression(node: ts.NewExpression, ctx: Ctx): undefined {
  const callee = node.expression
  if (ts.isIdentifier(callee) && NEW_BUILTINS.has(callee.text)) return
  pushFinding(
    node,
    "newNonBuiltin",
    "`new` is only allowed on a small set of global builtins — found a non-builtin constructor",
    ctx
  )
}

export function checkAwait(node: ts.AwaitExpression, ctx: Ctx): undefined {
  const op = node.expression
  if (
    ts.isCallExpression(op) &&
    ts.isPropertyAccessExpression(op.expression) &&
    ts.isIdentifier(op.expression.expression) &&
    op.expression.expression.text === "ctx"
  ) {
    return
  }
  pushFinding(
    node,
    "awaitNonCtx",
    "`await` is only allowed on direct ctx.<method>(...) calls — every effect must flow through ctx",
    ctx
  )
}

export function checkParameter(node: ts.ParameterDeclaration, ctx: Ctx): undefined {
  if (node.type !== undefined) return
  const parent = node.parent
  if (
    !ts.isFunctionDeclaration(parent) &&
    !ts.isFunctionExpression(parent) &&
    !ts.isMethodDeclaration(parent)
  ) {
    return
  }
  pushFinding(node, "untypedParam", "function parameters require an explicit type annotation", ctx)
}

export function checkThrow(node: ts.ThrowStatement, ctx: Ctx): undefined {
  const arg = node.expression
  if (arg === undefined) return
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) return
  if (ts.isTemplateExpression(arg)) return
  if (ts.isNewExpression(arg)) {
    const callee = arg.expression
    if (ts.isIdentifier(callee) && THROW_ERROR_CTORS.has(callee.text)) return
  }
  pushFinding(node, "throwNonError", "throw of a non-Error non-string value is forbidden", ctx)
}

export function checkImport(node: ts.ImportDeclaration, ctx: Ctx): undefined {
  if (node.importClause?.isTypeOnly === true) return

  const specifierNode = node.moduleSpecifier
  if (!ts.isStringLiteral(specifierNode)) return
  const specifier = specifierNode.text

  if (DIRECT_IO_MODULES.has(specifier)) {
    pushFinding(
      node,
      "directIO",
      `direct IO module \`${specifier}\` is forbidden — every effect goes through ctx`,
      ctx
    )
    return
  }

  if (node.importClause === undefined) {
    pushFinding(
      node,
      "runtimeImport",
      "side-effect-only imports are forbidden — every import must be type-only or from the runtime allowlist",
      ctx
    )
    return
  }

  const namedBindings = node.importClause.namedBindings
  if (
    node.importClause.name === undefined &&
    namedBindings !== undefined &&
    ts.isNamedImports(namedBindings)
  ) {
    const allTypeOnly = namedBindings.elements.every((el) => el.isTypeOnly === true)
    if (allTypeOnly) return
  }

  if (!ctx.allowed.has(specifier)) {
    pushFinding(
      node,
      "runtimeImport",
      `runtime import from \`${specifier}\` is forbidden — must be type-only or from the runtime allowlist`,
      ctx
    )
  }
}
