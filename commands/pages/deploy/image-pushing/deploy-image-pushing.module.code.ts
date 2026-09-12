import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { buildOf } from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import { publish } from "akasha/infrastructure/container-image/image-publishing/image-publishing.module.code.ts"

const IMAGE = "image"
const HELD = "the registry holds it"
const BUILT = "built and pushed"
const WOULD = "would be built"

export async function pushedImage(
  slug: string,
  dryRun: boolean,
  codeAt: string,
  up: string[] = []
): Promise<Answer> {
  const made = await publish(buildOf(slug, codeAt), dryRun, codeAt, up)
  return told([[IMAGE, made.ref, made.built ? BUILT : made.held ? HELD : WOULD].join("\t")])
}
