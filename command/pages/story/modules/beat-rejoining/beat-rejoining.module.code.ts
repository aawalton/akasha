const PROSE = "prose"

const LINE_ENDS = /\r?\n/

export function rejoined(written: string): string {
  return written
    .split(LINE_ENDS)
    .filter((one) => one !== "")
    .map((one) => {
      const held: unknown = JSON.parse(one)
      const prose = typeof held === "object" && held !== null ? Reflect.get(held, PROSE) : null
      return typeof prose === "string" ? prose : ""
    })
    .join("")
}
