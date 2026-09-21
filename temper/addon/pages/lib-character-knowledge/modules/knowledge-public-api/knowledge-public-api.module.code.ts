import {
  asGlobalTable,
  asNumber,
} from "akasha/temper/addon/pages/lib-character-knowledge/modules/knowledge-casts/knowledge-casts.module.code.ts"
import { LDEI } from "akasha/temper/addon/pages/lib-character-knowledge/modules/knowledge-ldei/knowledge-ldei.module.code.ts"
import {
  INTERNAL,
  PUBLIC,
} from "akasha/temper/addon/pages/lib-character-knowledge/modules/knowledge-state/knowledge-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

type Versioned = { version?: unknown } | undefined
function asVersioned(value: unknown): Versioned {
  return value as Versioned
}

function publishVersioned(this: void, name: string, lib: { version: number }): undefined {
  const existing = asVersioned(asGlobalTable(globalThis)[name])
  if (
    !(
      type(existing) === "table" &&
      type(existing?.version) === "number" &&
      asNumber(existing?.version) >= lib.version
    )
  ) {
    asGlobalTable(globalThis)[name] = lib
  }
}

const glob = asGlobalTable(globalThis)

glob.LibCharacterKnowledge = PUBLIC
glob.LibCharacterKnowledgeInternal = INTERNAL

publishVersioned("LibDataExportImport", LDEI)
