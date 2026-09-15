import { mkdirSync, realpathSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  nothingFiled,
  pageFiled,
  relationFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const HERE = "shell-clean-"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const DECLARES = "page-property"

const HELD = "sh"

const SHELL = "shell"

const SCRIPT = "shell-script"

const SHELL_AT = "akasha/shell.file-property.ts"

const SCRIPT_AT = "akasha/shell-script.page-type.ts"

const PART_PAGE_AT = "akasha/part/part.shell-script.ts"

const SHELL_ID = "01a06110-0000-7000-8000-00000000e104"

const SCRIPT_ID = "01a06110-0000-7000-8000-00000000e105"

const PART_ID = "01a06110-0000-7000-8000-00000000e106"

export const FILED_AT = "akasha/part/part.shell-script.shell.sh"

export const ONE = "akasha/one.sh"

export const CLEAN = '#!/usr/bin/env bash\nset -euo pipefail\n\necho "held"\n'

export const FAULT = "#!/usr/bin/env bash\nset -euo pipefail\n\nheld=$1\necho $held\n"

export const UNQUOTED = "Double quote to prevent globbing"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = realpathSync(scratch.rootFor(HERE))
  nothingFiled(root)
  return root
}

export function scripted(root: string): undefined {
  shapeAdded(root, FILE_PROPERTY, SHELL, [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: SHELL,
      propertySlug: SHELL,
      fileName: null,
    },
  ])
  listedFiled(root, FILE_PROPERTY, SHELL, [{ path: SHELL_AT, id: SHELL_ID }])
  pageFiled(root, SHELL_ID, SHELL_AT)
  valueAlsoFiled(root, FILE_PROPERTY, [
    {
      path: SHELL_AT,
      value: {
        id: SHELL_ID,
        pageTypeSlug: FILE_PROPERTY,
        slug: SHELL,
        propertySlug: SHELL,
        extensions: [HELD],
      },
    },
  ])
  listedFiled(root, PAGE_TYPE, SCRIPT, [{ path: SCRIPT_AT, id: SCRIPT_ID }])
  pageFiled(root, SCRIPT_ID, SCRIPT_AT)
  valueAlsoFiled(root, PAGE_TYPE, [
    {
      path: SCRIPT_AT,
      value: {
        id: SCRIPT_ID,
        pageTypeSlug: PAGE_TYPE,
        slug: SCRIPT,
        properties: [{ pagePropertySlug: SHELL }],
      },
    },
  ])
  relationFiled(root, SHELL_ID, DECLARES, SCRIPT_ID, [{ path: SCRIPT_AT }])
  listedFiled(root, SCRIPT, "part", [{ path: PART_PAGE_AT, id: PART_ID }])
  valueAlsoFiled(root, SCRIPT, [
    { path: PART_PAGE_AT, value: { id: PART_ID, pageTypeSlug: SCRIPT, slug: "part", shell: HELD } },
  ])
}

export function tracked(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, said)
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
