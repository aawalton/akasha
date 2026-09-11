import { founded, typed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"

export const AT = "checks/one/one.module.code.ts"

export const WRITES =
  'import { writeFileSync } from "node:fs"\n' +
  'import { join } from "node:path"\n' +
  "export function one(given: { root: string }): void {\n" +
  '  writeFileSync(join(given.root, "a.ts"), "")\n' +
  "}\n"

export const READS = 'import { join } from "node:path"\nexport const a = join("b", "c.ts")\n'

const CHANGE_AT = "changes/change.page-type.ts"

const COMMAND_AT = "commands/command.page-type.ts"

const NAMESAKE_AT = "design/primitives/command/command.module.ts"

const NAMESAKE_ID = "01a08299-65c2-7003-8000-000000000003"

const CHANGE_ID = "01a08299-65c2-7001-8000-000000000001"

const COMMAND_ID = "01a08299-65c2-7002-8000-000000000002"

export const IGNORE_AT = ".gitignore"

const IGNORES = "*.uncommitted.*\n.supervisors/\nnode_modules/\n"

export const IGNORES_HOLDING = `${IGNORES}held/\n`

export const IGNORES_LESS = "*.uncommitted.*\n.supervisors/\n"

function writesInto(where: string): string {
  return (
    'import { writeFileSync } from "node:fs"\n' +
    'import { join } from "node:path"\n' +
    "export function one(given: { root: string }): void {\n" +
    `  writeFileSync(join(given.root, "${where}"), "")\n` +
    "}\n"
  )
}

export const WRITES_HELD = writesInto("held/a.ts")

export const WRITES_VENDORED = writesInto("node_modules/a.ts")

const MODULE_VALUES: readonly {
  readonly path: string
  readonly value: Record<string, unknown>
}[] = [
  {
    path: "pages/checkout-roots/checkout-roots.module.ts",
    value: {
      id: "01a08299-65c2-7004-8000-000000000004",
      pageTypeSlug: "module",
      slug: "checkout-roots",
      answersACheckoutRoot: true,
    },
  },
  {
    path: "pages/code-root/code-root.module.ts",
    value: {
      id: "01a08299-65c2-7005-8000-000000000005",
      pageTypeSlug: "module",
      slug: "code-root",
      answersACheckoutRoot: true,
    },
  },
  {
    path: "temper/build-deploy-checks/repo-root/repo-root.module.ts",
    value: {
      id: "01a08299-65c2-7006-8000-000000000006",
      pageTypeSlug: "module",
      slug: "repo-root",
      answersACheckoutRoot: true,
    },
  },
  {
    path: "checks/modules/change-walking/change-walking.module.ts",
    value: {
      id: "01a08299-65c2-7007-8000-000000000007",
      pageTypeSlug: "module",
      slug: "change-walking",
    },
  },
  {
    path: "pages/shadow/shadow.module.ts",
    value: {
      id: "01a08299-65c2-7008-8000-000000000008",
      pageTypeSlug: "module",
      slug: "shadow",
      answersACheckoutRoot: false,
    },
  },
]

export const ROOT_MODULES_FILED: readonly string[] = ["checkout-roots", "code-root", "repo-root"]

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-written-by-")
  founded(root)
  writing(root, IGNORE_AT, IGNORES)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  listedFiled(root, "page-type", "change", [{ path: CHANGE_AT, id: CHANGE_ID }])
  listedFiled(root, "page-type", "command", [{ path: COMMAND_AT, id: COMMAND_ID }])
  listedFiled(root, "module", "command", [{ path: NAMESAKE_AT, id: NAMESAKE_ID }])
  valueAlsoFiled(root, "module", MODULE_VALUES)
  return root
}
