import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { type Asking, runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { codeRoot } from "@akasha/pages/code-root"
import { parseEsoDocApiVersion } from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiDir } from "@akasha/temper-eso-paths/eso-paths"
import type { HudComponentRecord } from "akasha/temper/hud-components/hud-component-record/hud-component-record.module.code.ts"
import { HUD_SCENE_CATALOG_SCHEMA } from "akasha/temper/hud-components/hud-component-record/hud-component-record.module.code.ts"
import { buildCatalog } from "akasha/temper/hud-components/hud-scene-parse/hud-scene-parse.module.code.ts"
import { HUD_SCENE_SOURCE } from "akasha/temper/hud-components/hud-scene-source/hud-scene-source.module.code.ts"
import {
  saidFor,
  saidShort,
} from "../../../../../../temper/temper-commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"
import { answering, refused } from "../../../../../modules/calling/calling.module.code.ts"

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const DOC_REL = "ESOUIDocumentation.txt"

const CATALOG_DIR = "temper/temper-hud-components"

const AKASHA_FILE_CEILING = 15000

const PUT = "change-mechanical/add-file-code"

const MESSAGE = "the catalog of HUD parts, read out of the game's own scene source"

interface CatalogModule {
  readonly slug: string
  readonly binding: string
  readonly holds: (record: HudComponentRecord) => boolean
}

const CATALOG_MODULES: readonly CatalogModule[] = [
  {
    slug: "hud-fragment-group",
    binding: "HUD_FRAGMENT_GROUP",
    holds: (record) => record.hideMechanism === "fragment-group",
  },
  {
    slug: "hud-scene-fragments",
    binding: "HUD_SCENE_FRAGMENTS",
    holds: (record) => record.hideMechanism === "scene-fragment",
  },
  {
    slug: "hud-controls",
    binding: "HUD_CONTROLS",
    holds: (record) => record.kind === "non-fragment-control",
  },
]

function renderRecord(record: HudComponentRecord): string {
  const lines = [
    "  {",
    `    id: ${JSON.stringify(record.id)},`,
    `    name: ${JSON.stringify(record.name)},`,
    `    esoGlobal: ${JSON.stringify(record.esoGlobal)},`,
    `    kind: ${JSON.stringify(record.kind)},`,
    `    hideMechanism: ${JSON.stringify(record.hideMechanism)},`,
    `    scenes: [${record.scenes.map((scene) => JSON.stringify(scene)).join(", ")}],`,
    `    category: ${JSON.stringify(record.category)},`,
    `    source: { file: HUD_SCENE_SOURCE, line: ${String(record.source.line)} },`,
    `    conditional: ${String(record.conditional)},`,
    `    wrapsMultiple: ${String(record.wrapsMultiple)},`,
  ]
  if (record.grainNotes !== undefined) {
    lines.push(`    grainNotes: ${JSON.stringify(record.grainNotes)},`)
  }
  lines.push("  },")
  return lines.join("\n")
}

function renderModule(binding: string, records: readonly HudComponentRecord[]): string {
  return `import type { HudComponentRecord } from "../hud-component-record/hud-component-record.module.code.ts"
import { HUD_SCENE_SOURCE } from "../hud-scene-source/hud-scene-source.module.code.ts"

export const ${binding} = [
${records.map(renderRecord).join("\n")}
] as const satisfies readonly HudComponentRecord[]
`
}

export async function temperEsoGenerateHudSceneCatalog(
  argv: readonly string[] = []
): Promise<Answer> {
  const named = saidFor(argv, CODE_ROOT_FLAG)

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const cloneDir = esouiDir()
  const scenePath = join(cloneDir, HUD_SCENE_SOURCE)
  const docPath = join(cloneDir, DOC_REL)

  let source: string
  let doc: string
  try {
    source = await readFile(scenePath, "utf8")
    doc = await readFile(docPath, "utf8")
  } catch (thrown) {
    return refused(
      `${scenePath} and ${docPath} are Zenimax's own UI source and are vendored in no repository here. ` +
        "Restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with ESOUI_SRC_DIR — " +
        saidShort(thrown),
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(doc)
  } catch (thrown) {
    return refused(`${docPath} states no API version — ${saidShort(thrown)}`, DATA)
  }

  const catalog = HUD_SCENE_CATALOG_SCHEMA.parse(buildCatalog(source, HUD_SCENE_SOURCE))
  if (catalog.length === 0) {
    return refused(
      `${scenePath} names no component. An empty catalog reads to every consumer as a clean answer, so nothing was written.`,
      DATA
    )
  }

  const rendered = CATALOG_MODULES.map((one) => {
    const held = catalog.filter(one.holds)
    return { slug: one.slug, body: renderModule(one.binding, held), count: held.length }
  })

  const tooLong = rendered.filter((one) => one.body.length > AKASHA_FILE_CEILING)
  if (tooLong.length > 0) {
    return refused(
      `${tooLong.map((one) => `${one.slug} would be ${String(one.body.length)} bytes`).join(", ")} — ` +
        `nothing under akasha/ may exceed ${String(AKASHA_FILE_CEILING)} bytes, so the catalog wants ` +
        "dividing into more modules before it is written again. Nothing was written.",
      DATA
    )
  }

  const written: string[] = []
  const asked: Asking[] = []
  for (const one of rendered) {
    const at = `${CATALOG_DIR}/${one.slug}/${one.slug}.module.code.ts`
    let had: string | null = null
    try {
      had = await readFile(resolve(root, at), "utf8")
    } catch {}
    if (had !== one.body) asked.push({ at: PUT, given: { at, body: one.body } })
    const said = had === one.body ? "held" : "landed"
    written.push(`${said} ${resolve(root, at)} (${String(one.count)})`)
  }
  if (asked.length > 0) {
    const landed = await runMechanicalChange(root, asked, MESSAGE)
    if ("refusals" in landed) {
      return refused(`the catalog was not landed whole — ${landed.refusals.join("; ")}`, FAILED)
    }
  }

  const fragments = catalog.filter((one) => one.kind === "fragment").length
  const uncategorized = catalog.filter((one) => one.category === "uncategorized").length
  return answering(
    [
      `wrote ${String(catalog.length)} component(s) — ${String(fragments)} fragment(s), ` +
        `${String(catalog.length - fragments)} non-fragment control(s), ` +
        `${String(uncategorized)} uncategorized`,
      `read from ${scenePath} at API version ${String(apiVersion)}`,
      ...written,
    ],
    [],
    0
  )
}
