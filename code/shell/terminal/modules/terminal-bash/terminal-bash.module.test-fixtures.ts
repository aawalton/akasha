export async function parses(text: string): Promise<number> {
  const ran = Bun.spawn({ cmd: ["bash", "-n"], stdin: new TextEncoder().encode(text) })
  return await ran.exited
}
