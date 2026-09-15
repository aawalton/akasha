import { answering, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"

export async function ran(running: (done: string[]) => Promise<void>): Promise<Answer> {
  return await answering(async (done) => {
    await running(done)
    return told([])
  })
}
