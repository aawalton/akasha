import { __TS__Match } from "akasha/language-design/lua-compiler/lualibs/match/match.lualib.code.ts"

export function __TS__ParseFloat(this: void, numberString: string): number {
  const [infinityMatch] = __TS__Match(numberString, "^%s*(-?Infinity)")
  if (infinityMatch !== undefined) {
    return infinityMatch.startsWith("-") ? -Infinity : Infinity
  }

  const number = tonumber(__TS__Match(numberString, "^%s*(-?%d+%.?%d*)")[0])
  return number ?? NaN
}
