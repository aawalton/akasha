import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { buildOf } from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import { publish } from "akasha/infrastructure/container-image/modules/image-publishing/image-publishing.module.code.ts"

const IMAGE = "image"
const HELD = "the registry holds it"
const BUILT = "built and pushed"

export async function pushedImage(
  slug: string,
  codeAt: string,
  up: string[] = []
): Promise<Answer> {
  const made = await publish(buildOf(slug, codeAt), codeAt, up)
  return told([[IMAGE, made.ref, made.built ? BUILT : HELD].join("\t")])
}
