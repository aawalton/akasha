export type Saying = (text: string, err?: unknown) => undefined

export function sayingWith(mark: string): Saying {
  return (text, err): undefined => {
    try {
      if (err === undefined) console.error(`${mark} ${text}`)
      else console.error(`${mark} ${text}`, err)
      return
    } catch {}
    try {
      process.stderr.write(`${mark} ${text}\n`)
    } catch {
      return
    }
  }
}
