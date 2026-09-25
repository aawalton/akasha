import { inputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const TEXT = SHAPE.string()

export async function readStdinOrFile(path: string): Promise<string> {
  if (path === "-") return await readStdin()
  try {
    return TEXT.parse(await Bun.file(path).text())
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw inputError(`failed to read ${path}: ${reason}`)
  }
}

async function readStdin(): Promise<string> {
  return await new Response(Bun.stdin.stream()).text()
}
