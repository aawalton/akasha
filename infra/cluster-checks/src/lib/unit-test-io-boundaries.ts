import ts from "typescript"

export type IoSeam =
  | "bun-subprocess"
  | "node-subprocess"
  | "process-control"
  | "host-fs"
  | "network"

export interface IoBoundaryModule {
  readonly path: string
  readonly seams: readonly IoSeam[]
}

export const IO_BOUNDARY_MODULES: readonly IoBoundaryModule[] = [
  {
    path: "packages/shared/graph/producers/src/lib/discover-repo-files.ts",
    seams: ["node-subprocess", "host-fs"],
  },
  { path: "packages/infra/domain-expiry/src/rdap-fetch.ts", seams: ["network"] },
]

const BUN_SUBPROCESS_PRIMITIVES: ReadonlySet<string> = new Set(["which", "spawn"])

function isSpyOnCallee(expression: ts.Expression): boolean {
  if (ts.isIdentifier(expression)) return expression.text === "spyOn"
  return ts.isPropertyAccessExpression(expression) && expression.name.text === "spyOn"
}

function takesBunSubprocessSeam(call: ts.CallExpression): boolean {
  const target = call.arguments[0]
  const primitive = call.arguments[1]
  if (target === undefined || primitive === undefined) return false
  if (!ts.isIdentifier(target) || target.text !== "Bun") return false
  return ts.isStringLiteralLike(primitive) && BUN_SUBPROCESS_PRIMITIVES.has(primitive.text)
}

export function spiedIoSeams(repoRelFile: string, source: string): ReadonlySet<IoSeam> {
  const kind = repoRelFile.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const parsed = ts.createSourceFile(repoRelFile, source, ts.ScriptTarget.Latest, true, kind)
  const seams = new Set<IoSeam>()
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isCallExpression(node) &&
      isSpyOnCallee(node.expression) &&
      takesBunSubprocessSeam(node)
    ) {
      seams.add("bun-subprocess")
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(parsed, visit)
  return seams
}

export function neutralizesBoundary(
  boundary: IoBoundaryModule,
  spied: ReadonlySet<IoSeam>
): boolean {
  return boundary.seams.length > 0 && boundary.seams.every((seam) => spied.has(seam))
}
