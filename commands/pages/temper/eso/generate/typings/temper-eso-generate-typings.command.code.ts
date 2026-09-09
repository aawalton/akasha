import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { type Asking, runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { codeRoot } from "@akasha/pages/code-root"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiDocPath } from "@akasha/temper-eso-paths/eso-paths"
import {
  generateEnumsFile,
  generateEventsFile,
  generateFunctionsFile,
  generateObjectsFile,
} from "akasha/temper/eso-typings/eso-declaration-text/eso-declaration-text.module.code.ts"
import {
  parseEnums,
  parseEvents,
  parseFunctions,
  parseObjects,
} from "akasha/temper/eso-typings/eso-doc-tokens/eso-doc-tokens.module.code.ts"
import { ESO_OPT_IN } from "akasha/temper/eso-typings/eso-opt-in/eso-opt-in.module.code.ts"
import { selectOptIn } from "akasha/temper/eso-typings/eso-token-scope/eso-token-scope.module.code.ts"
import {
  saidFor,
  saidShort,
} from "../../../../../../temper/temper-commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"
import { answering, refused } from "../../../../../modules/calling/calling.module.code.ts"

const DATA = 2

const FAILED = 3

const SELF = "akasha temper-eso-generate-typings"

const CODE_ROOT_FLAG = "--code-root"

const OUT_REL = "temper/addons/types/eso/generated"

const PUT = "change-mechanical/add-file-code"

const MESSAGE = "the game's API declarations, read out of the game's own documentation"

const INDEX_BODY = `/// <reference path="./enums.d.ts" />
/// <reference path="./functions.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./objects.d.ts" />
`

export async function temperEsoGenerateTypings(argv: readonly string[] = []): Promise<Answer> {
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

  const docPath = esouiDocPath()
  let doc: string
  try {
    doc = await readFile(docPath, "utf8")
  } catch (thrown) {
    return refused(
      `${docPath} is the game's own API documentation and is vendored in no repository here, so there was nothing to read the declarations out of. ` +
        "Restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with ESOUI_SRC_DIR — " +
        `${saidShort(thrown)}`,
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(doc)
  } catch (thrown) {
    return refused(
      `${docPath} states no API version, so a written declaration would carry no stamp for the freshness audit to weigh — ${saidShort(thrown)}`,
      DATA
    )
  }

  const selected = selectOptIn(
    {
      enums: parseEnums(doc),
      functions: parseFunctions(doc),
      events: parseEvents(doc),
      objects: parseObjects(doc),
    },
    ESO_OPT_IN
  )

  const stamp = esoCloneHeaderLines(SELF, apiVersion)
    .map((line) => `// ${line}`)
    .join("\n")
  const stamped = (body: string): string => `${stamp}\n${body}`

  const outDir = resolve(root, OUT_REL)
  const bodies: readonly (readonly [string, string])[] = [
    ["enums.d.ts", stamped(generateEnumsFile(selected.enums))],
    ["functions.d.ts", stamped(generateFunctionsFile(selected.functions))],
    ["events.d.ts", stamped(generateEventsFile(selected.events))],
    ["objects.d.ts", stamped(generateObjectsFile(selected.objects))],
    ["index.d.ts", stamped(INDEX_BODY)],
  ]

  const asked: Asking[] = []
  for (const [name, body] of bodies) {
    const at = `${OUT_REL}/${name}`
    let had: string | null = null
    try {
      had = await readFile(resolve(root, at), "utf8")
    } catch {}
    if (had !== body) asked.push({ at: PUT, given: { at, body } })
  }

  if (asked.length > 0) {
    const landed = await runMechanicalChange(root, asked, MESSAGE)
    if ("refusals" in landed) {
      return refused(
        `the declarations were not landed whole into ${outDir} — ${landed.refusals.join("; ")}`,
        FAILED
      )
    }
  }

  return answering(
    [
      `${String(selected.functions.length)} function(s), ${String(selected.objects.length)} object(s), ` +
        `${String(selected.events.length)} event(s) and ${String(selected.enums.length)} enum(s) ` +
        `are declared in ${outDir}`,
      asked.length === 0
        ? `${outDir} already held every one, so nothing landed`
        : `landed ${String(asked.length)} file(s)`,
      `read from ${docPath} at API version ${String(apiVersion)}`,
    ],
    [],
    0
  )
}
