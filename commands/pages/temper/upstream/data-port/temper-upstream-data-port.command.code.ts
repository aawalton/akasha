import { realpathSync } from "node:fs"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  namesIn,
  valuesOf,
} from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import { port as portHousing } from "akasha/temper/upstream-data/housing-upstream-port/housing-upstream-port.module.code.ts"
import { port as portMapData } from "akasha/temper/upstream-data/map-data-upstream-port/map-data-upstream-port.module.code.ts"
import { port as portTreasure } from "akasha/temper/upstream-data/treasure-upstream-port/treasure-upstream-port.module.code.ts"
import type { UpstreamLibrary } from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import {
  libraryNamed,
  UPSTREAM_LIBRARIES,
} from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import { port as portZone } from "akasha/temper/upstream-data/zone-upstream-port/zone-upstream-port.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

const TAKING_A_VALUE = [CODE_ROOT_FLAG]

const PORTED_BY: Record<UpstreamLibrary, (root: string, done: string[]) => Promise<void>> = {
  housing: portHousing,
  "lib-map-data": portMapData,
  "lib-treasure": portTreasure,
  "lib-zone": portZone,
}

function carried(): string {
  return UPSTREAM_LIBRARIES.join(", ")
}

export type Porting = (done: string[], library: UpstreamLibrary, root: string) => Promise<Answer>

async function ported(done: string[], library: UpstreamLibrary, root: string): Promise<Answer> {
  await PORTED_BY[library](root, done)
  return told([`ported ${library} into ${root}, writing each emitted file whole`])
}

export async function portedBy(
  library: UpstreamLibrary,
  root: string,
  porting: Porting = ported
): Promise<Answer> {
  return await answering(async (done) => await porting(done, library, root))
}

export async function temperUpstreamDataPort(argv: readonly string[] = []): Promise<Answer> {
  const names = namesIn(argv, TAKING_A_VALUE)
  if (names.length === 0) {
    return refused(`name the upstream library ported — this carries ${carried()}`, INPUT)
  }
  if (names.length > 1) {
    return refused(
      `one call ports one library, and ${names.join(", ")} names ${String(names.length)}`,
      INPUT
    )
  }

  const named = names[0] as string
  const library = libraryNamed(named)
  if (library === undefined) {
    return refused(`${named} is no upstream library this ports — it carries ${carried()}`, INPUT)
  }

  const askedRoot = valuesOf(argv, CODE_ROOT_FLAG)[0]
  let root: string
  try {
    root = realpathSync(askedRoot ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${askedRoot ?? codeRoot()} is no checkout on this disk, so nothing was ported into it: ${messageOf(thrown)}`,
      DATA
    )
  }

  process.env[CODE_ROOT_ENV] = root

  return await portedBy(library, root)
}
