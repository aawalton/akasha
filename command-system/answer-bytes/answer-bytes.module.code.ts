export const ANSWER_BYTES = "answer-bytes"

const SAID = `${ANSWER_BYTES}: `

export function sayAnswer(text: string): undefined {
  process.stderr.write(`${SAID}${Buffer.byteLength(text, "utf8")}\n`)
  process.stdout.write(text)
  return undefined
}

export function answerBytesSaid(stderr: string): number | null {
  let said: number | null = null
  for (const line of stderr.split("\n")) {
    if (!line.startsWith(SAID)) continue
    const stated = Number(line.slice(SAID.length).trim())
    if (Number.isInteger(stated) && stated >= 0) said = stated
  }
  return said
}
