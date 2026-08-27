import ts from "typescript"
import {
  collectSignatureTypeRefs,
  exportKindFromNode,
  hasDefaultModifier,
  hasExportModifier,
  lineOf,
} from "./ts-import-graph-ast-helpers"
import type { CollectedExports, ModuleExport, ModuleImport } from "./ts-import-graph-types"

export function collectExports(sourceFile: ts.SourceFile): CollectedExports {
  const exports: ModuleExport[] = []

  for (const stmt of sourceFile.statements) {
    if (hasExportModifier(stmt)) {
      const kind = exportKindFromNode(stmt)
      const typeOnly = ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      if (hasDefaultModifier(stmt)) {
        exports.push({ name: "default", line, kind: "default", typeOnly: false })
        continue
      }
      if (
        ts.isFunctionDeclaration(stmt) ||
        ts.isClassDeclaration(stmt) ||
        ts.isInterfaceDeclaration(stmt) ||
        ts.isEnumDeclaration(stmt) ||
        ts.isModuleDeclaration(stmt) ||
        ts.isTypeAliasDeclaration(stmt)
      ) {
        const nameNode = stmt.name
        if (nameNode && ts.isIdentifier(nameNode)) {
          const signatureTypeRefs = collectSignatureTypeRefs(stmt)
          exports.push({ name: nameNode.text, line, kind, typeOnly, signatureTypeRefs })
        }
        continue
      }
      if (ts.isVariableStatement(stmt)) {
        const signatureTypeRefs = collectSignatureTypeRefs(stmt)
        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const declLine = lineOf(sourceFile, decl.getStart(sourceFile))
            exports.push({
              name: decl.name.text,
              line: declLine,
              kind,
              typeOnly: false,
              signatureTypeRefs,
            })
          } else if (ts.isObjectBindingPattern(decl.name) || ts.isArrayBindingPattern(decl.name)) {
            for (const elem of decl.name.elements) {
              if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name)) {
                const elemLine = lineOf(sourceFile, elem.getStart(sourceFile))
                exports.push({ name: elem.name.text, line: elemLine, kind, typeOnly: false })
              }
            }
          }
        }
      }
      continue
    }

    if (ts.isExportDeclaration(stmt)) {
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      const typeOnly = stmt.isTypeOnly
      if (stmt.exportClause) {
        if (ts.isNamedExports(stmt.exportClause)) {
          for (const elem of stmt.exportClause.elements) {
            const name = elem.name.text
            exports.push({
              name,
              line: lineOf(sourceFile, elem.getStart(sourceFile)),
              kind: "reexport",
              typeOnly: typeOnly || elem.isTypeOnly,
            })
          }
        } else if (ts.isNamespaceExport(stmt.exportClause)) {
          const name = stmt.exportClause.name.text
          exports.push({ name, line, kind: "reexport", typeOnly })
        }
      }
      continue
    }

    if (ts.isExportAssignment(stmt)) {
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      exports.push({ name: "default", line, kind: "default", typeOnly: false })
    }
  }

  return { exports }
}

export function collectImports(sourceFile: ts.SourceFile): readonly ModuleImport[] {
  const imports: ModuleImport[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isImportDeclaration(node)) {
      if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) return
      const specifier = node.moduleSpecifier.text
      const line = lineOf(sourceFile, node.getStart(sourceFile))
      const typeOnly = node.importClause?.isTypeOnly ?? false
      const importedNames: (string | "*" | null)[] = []
      const clause = node.importClause
      if (!clause) {
        importedNames.push(null)
      } else {
        if (clause.name) importedNames.push("default")
        if (clause.namedBindings) {
          if (ts.isNamespaceImport(clause.namedBindings)) {
            importedNames.push("*")
          } else if (ts.isNamedImports(clause.namedBindings)) {
            for (const el of clause.namedBindings.elements) {
              const imported = el.propertyName?.text ?? el.name.text
              importedNames.push(imported)
            }
          }
        }
      }
      imports.push({
        specifier,
        resolvedPath: null,
        importedNames,
        typeOnly,
        dynamic: false,
        isReexport: false,
        line,
      })
      return
    }

    if (ts.isExportDeclaration(node)) {
      if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
        return
      }
      const specifier = node.moduleSpecifier.text
      const line = lineOf(sourceFile, node.getStart(sourceFile))
      const typeOnly = node.isTypeOnly
      const importedNames: (string | "*" | null)[] = []
      let reexportLocalNames: (string | "*" | null)[] | undefined
      if (!node.exportClause) {
        importedNames.push("*")
      } else if (ts.isNamedExports(node.exportClause)) {
        reexportLocalNames = []
        for (const elem of node.exportClause.elements) {
          importedNames.push(elem.propertyName?.text ?? elem.name.text)
          reexportLocalNames.push(elem.name.text)
        }
      } else if (ts.isNamespaceExport(node.exportClause)) {
        importedNames.push("*")
      }
      imports.push({
        specifier,
        resolvedPath: null,
        importedNames,
        reexportLocalNames,
        typeOnly,
        dynamic: false,
        isReexport: true,
        line,
      })
      return
    }

    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined
    ) {
      const arg = node.arguments[0]
      if (ts.isStringLiteral(arg)) {
        imports.push({
          specifier: arg.text,
          resolvedPath: null,
          importedNames: ["*"],
          typeOnly: false,
          dynamic: true,
          isReexport: false,
          line: lineOf(sourceFile, node.getStart(sourceFile)),
        })
      } else if (ts.isTemplateExpression(arg)) {
        const lastSpan = arg.templateSpans[arg.templateSpans.length - 1]
        if (lastSpan === undefined) return
        const tail = lastSpan.literal.text
        if (tail.length > 0 && tail.includes("/")) {
          imports.push({
            specifier: `[dynamic-import-suffix]${tail}`,
            resolvedPath: null,
            importedNames: ["*"],
            typeOnly: false,
            dynamic: true,
            isReexport: false,
            line: lineOf(sourceFile, node.getStart(sourceFile)),
          })
        }
      }
    }

    if (
      ts.isModuleDeclaration(node) &&
      node.name &&
      ts.isStringLiteral(node.name) &&
      node.body &&
      ts.isModuleBlock(node.body)
    ) {
      const specifier = node.name.text
      if (!specifier.includes("*")) {
        const line = lineOf(sourceFile, node.getStart(sourceFile))
        const augmentedNames: string[] = []
        for (const stmt of node.body.statements) {
          if (ts.isInterfaceDeclaration(stmt)) {
            augmentedNames.push(stmt.name.text)
          }
        }

        if (augmentedNames.length > 0) {
          imports.push({
            specifier,
            resolvedPath: null,
            importedNames: augmentedNames,
            typeOnly: true,
            dynamic: false,
            isReexport: false,
            line,
          })
        }

        const localTypeRefs = new Set<string>()
        const augmentedSet = new Set(augmentedNames)
        function walkTypeRefs(n: ts.Node): undefined {
          if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) {
            const name = n.typeName.text
            if (!augmentedSet.has(name)) {
              localTypeRefs.add(name)
            }
          }
          ts.forEachChild(n, walkTypeRefs)
        }
        walkTypeRefs(node.body)

        if (localTypeRefs.size > 0) {
          imports.push({
            specifier: sourceFile.fileName,
            resolvedPath: sourceFile.fileName,
            importedNames: [...localTypeRefs],
            typeOnly: true,
            dynamic: false,
            isReexport: false,
            line,
          })
        }
      }
      return
    }

    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sourceFile, visit)
  return imports
}
