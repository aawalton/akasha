import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type {
  Laid,
  Tree,
} from "akasha/check/code/pages/browser-code-compiles/modules/route-typegen/route-typegen.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const PACKAGES = "node_modules"

const HERE = rootOf(import.meta.dir)

export const scratch = scratchWorld()

export const APP = "held/web"

export const TABLE_AT = `${APP}/routes.ts`

export const CONFIG_AT = `${APP}/tsconfig.json`

export const ROUTE_AT = `${APP}/routes/one/one.route.code.ts`

export const ADDED_AT = `${APP}/routes/two/two.route.code.ts`

export const SHARED_AT = "held/shared.module.ts"

const ONE = 'route("one/:held", "routes/one/one.route.code.ts")'

const TWO = 'route("two/:held", "routes/two/two.route.code.ts")'

function tableOf(routes: readonly string[]): string {
  return (
    'import { type RouteConfig, route } from "@react-router/dev/routes"\n\n' +
    `export default [${routes.join(", ")}] satisfies RouteConfig\n`
  )
}

const TABLE = tableOf([ONE])

export const TABLE_ADDING = tableOf([ONE, TWO])

export const TABLE_UNREAD = "export default 1\n"

function routeOf(name: string, held: string, body: string): string {
  return (
    `import type { Route } from "./+types/${name}.route.code"\n\n` +
    `export function loader({ params }: Route.LoaderArgs): ${held} {\n  ${body}\n}\n`
  )
}

const HOLDS = routeOf("one", "string", "return params.held")

export const BREAKS = routeOf("one", "number", "return params.held")

export const ADDED_BREAKS = routeOf("two", "number", "return params.held")

export const SHARING =
  'import type { Route } from "./+types/one.route.code"\n' +
  'import { shared } from "../../../shared.module.ts"\n\n' +
  "export function loader({ params }: Route.LoaderArgs): string {\n" +
  "  return params.held.concat(shared)\n}\n"

export const SHARED = 'export const shared = "shared"\n'

const CONFIG = {
  compilerOptions: {
    strict: true,
    noEmit: true,
    module: "preserve",
    moduleResolution: "bundler",
    target: "esnext",
    jsx: "react-jsx",
    skipLibCheck: true,
    allowImportingTsExtensions: true,
    types: [],
    rootDirs: [".", "./.react-router/types"],
  },
  include: ["*.ts", "*.tsx", "routes/**/*.ts", ".react-router/types/**/*.ts"],
}

export const APP_FILES: Readonly<Record<string, string>> = {
  [TABLE_AT]: TABLE,
  [`${APP}/react-router.config.ts`]: 'export default { appDirectory: ".", ssr: true }\n',
  [`${APP}/root.tsx`]: "export default function Root() {\n  return null\n}\n",
  [CONFIG_AT]: `${JSON.stringify(CONFIG, null, 2)}\n`,
  [ROUTE_AT]: HOLDS,
}

export function linkedPackages(root: string): string {
  symlinkSync(join(HERE, PACKAGES), join(root, PACKAGES))
  return root
}

export function written(files: Readonly<Record<string, string>> = APP_FILES): string {
  const root = scratch.rootFor("akasha-router-app-fixture-")
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  return linkedPackages(root)
}

export function laidOver(root: string, over: Readonly<Record<string, string | null>>): Laid {
  return (path) => {
    if (path in over) {
      const said = over[path]
      return said === undefined || said === null ? null : new TextEncoder().encode(said)
    }
    const at = join(root, path)
    return existsSync(at) ? readFileSync(at) : null
  }
}

export function treeOver(root: string, over: Readonly<Record<string, string | null>>): Tree {
  const paths = new Set<string>(Object.keys(APP_FILES))
  for (const [at, body] of Object.entries(over)) {
    if (body === null) paths.delete(at)
    else paths.add(at)
  }
  return { root, paths: [...paths].sort(), changed: Object.keys(over), laid: laidOver(root, over) }
}
