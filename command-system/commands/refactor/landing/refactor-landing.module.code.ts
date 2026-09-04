import type { Asked } from "../../../asking/asking.module.code.ts"
import { landingAsked, textOf } from "../../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../../calling/calling.module.code.ts"
import { answering } from "../../../calling/calling.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../../../landing/landing.module.code.ts"
import { baseOf } from "../../../landing/landing.module.code.ts"
import type { Carry } from "../../../reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../../reading/reading.module.code.ts"
import { glassIn, messageIn } from "../../write/write.command.code.ts"

const BYTES = new TextEncoder()

export type Saying = (dry: boolean) => readonly string[]

export function were(many: number, dry: boolean): string {
  return dry ? "would be" : many === 1 ? "was" : "were"
}

export function bodyTextOf(root: string, stood: string): (path: string) => string | null {
  return (path) => {
    const bytes = bodyAt(root, stood, path)
    return bytes === null ? null : textOf(bytes)
  }
}

export async function respelledLanded(
  given: Given,
  root: string,
  said: ReadonlyMap<string, string>,
  message: string,
  saying: Saying,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Promise<Answer> {
  const glass = glassIn(argv, flags)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const asked = messageIn(argv, flags)
  if ("refusals" in asked) return answering([], asked.refusals, 1)
  const base = baseOf(root)
  const changes: FileEdit[] = []
  const readings: Carry[] = []
  for (const path of [...said.keys()].sort()) {
    const body = said.get(path)
    if (body === undefined) continue
    const bytes = bodyAt(root, base, path)
    if (bytes === null) {
      return answering([], [`${path} stands in no commit at \`${base}\``], 2)
    }
    readings.push({ was: path, now: path, from: blobIdOf(bytes) })
    changes.push({ path, body: BYTES.encode(body), carried: true })
  }
  const asking: Asked = {
    changes,
    message: asked.message ?? message,
    dryRun,
    glass: glass.glass,
    unmoved: [],
    read: base,
    saying: () => saying(false),
  }
  const landing = await landingAsked({ ...given, root }, asking)
  if (!dryRun) {
    if (landing.code === 0) carryReadings(root, readings)
    return landing
  }
  return answering([...saying(true), ...landing.report], landing.refusals, landing.code)
}
