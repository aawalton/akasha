import { luaNumberString } from "@akasha/temper-lua-runner/lua-number-string"

const NUMERIC_KEY = /^-?\d+(\.\d+)?$/

const SHOWN = 8

const SEPARATOR = "\t"

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function dumpJsWalk(value: unknown, path: string, out: string[]): undefined {
  if (isRecord(value)) {
    const keys = Object.keys(value)
    const numbers = keys.filter((one) => NUMERIC_KEY.test(one)).map(Number)
    const words = keys.filter((one) => !NUMERIC_KEY.test(one))
    numbers.sort((a, b) => a - b)
    words.sort()
    for (const key of numbers)
      dumpJsWalk(value[String(key)], `${path}/${luaNumberString(key)}`, out)
    for (const key of words) dumpJsWalk(value[key], `${path}/${key}`, out)
    return
  }
  if (typeof value === "number") {
    out.push(`${path}${SEPARATOR}number${SEPARATOR}${luaNumberString(value)}`)
    return
  }
  if (typeof value === "string") {
    const escaped = value
      .replaceAll("\\", "\\\\")
      .replaceAll("\n", "\\n")
      .replaceAll("\r", "\\r")
      .replaceAll("\t", "\\t")
    out.push(`${path}${SEPARATOR}string${SEPARATOR}${escaped}`)
    return
  }
  if (typeof value === "boolean") {
    out.push(`${path}${SEPARATOR}boolean${SEPARATOR}${String(value)}`)
    return
  }
  throw new Error(`unsupported leaf type at ${path}: ${typeof value}`)
}

export const LUA_DUMP = `
function fmt_leaf_number(n)
  if n == math.floor(n) and math.abs(n) < 2^53 then return string.format("%d", n) end
  local s = string.format("%.14g", n)
  if tonumber(s) == n then return s end
  return string.format("%.17g", n)
end

function dump_walk(v, path, out)
  local t = type(v)
  if t == "table" then
    local nums, strs = {}, {}
    for k in pairs(v) do
      if type(k) == "number" then nums[#nums + 1] = k else strs[#strs + 1] = k end
    end
    table.sort(nums)
    table.sort(strs)
    for _, k in ipairs(nums) do dump_walk(v[k], path .. "/" .. fmt_leaf_number(k), out) end
    for _, k in ipairs(strs) do dump_walk(v[k], path .. "/" .. k, out) end
  elseif t == "number" then
    out[#out + 1] = path .. "\\tnumber\\t" .. fmt_leaf_number(v)
  elseif t == "string" then
    out[#out + 1] = path .. "\\tstring\\t" .. v:gsub("\\\\", "\\\\\\\\"):gsub("\\n", "\\\\n"):gsub("\\r", "\\\\r"):gsub("\\t", "\\\\t")
  elseif t == "boolean" then
    out[#out + 1] = path .. "\\tboolean\\t" .. tostring(v)
  else
    error("unsupported leaf type at " .. path .. ": " .. t)
  end
end
`

function keyOf(line: string): string {
  const at = line.indexOf(SEPARATOR)
  return at === -1 ? line : line.slice(0, at)
}

function restOf(line: string): string {
  const at = line.indexOf(SEPARATOR)
  return at === -1 ? "" : line.slice(at + 1)
}

function keyedBy(lines: readonly string[]): Map<string, string> {
  const held = new Map<string, string>()
  for (const line of lines) held.set(keyOf(line), restOf(line))
  return held
}

function everyKeyIn(upstream: Map<string, string>, ported: Map<string, string>): readonly string[] {
  return [...new Set([...upstream.keys(), ...ported.keys()])].sort()
}

export function partedIn(
  label: string,
  upstreamLines: readonly string[],
  portedLines: readonly string[]
): readonly string[] {
  const upstream = keyedBy(upstreamLines)
  const ported = keyedBy(portedLines)
  const onlyUpstream: string[] = []
  const onlyPorted: string[] = []
  const differing: string[] = []
  for (const key of everyKeyIn(upstream, ported)) {
    const there = upstream.get(key)
    const here = ported.get(key)
    if (there === undefined) {
      onlyPorted.push(`    ${key} = ${String(here)}`)
      continue
    }
    if (here === undefined) {
      onlyUpstream.push(`    ${key} = ${there}`)
      continue
    }
    if (there !== here) {
      differing.push(`    ${key}`, `      upstream ${there}`, `      ported   ${here}`)
    }
  }
  const parted = onlyUpstream.length + onlyPorted.length + differing.length
  if (parted === 0) return []

  const said = [
    `${label} parts from upstream: ` +
      `${String(upstreamLines.length)} leaf/leaves upstream against ${String(portedLines.length)} ported, ` +
      `${String(differing.length / 3)} differing, ` +
      `${String(onlyUpstream.length)} upstream alone, ${String(onlyPorted.length)} ported alone`,
  ]
  if (differing.length > 0) {
    said.push(`  leaves whose value differs, in path order:`)
    said.push(...differing.slice(0, SHOWN * 3))
  }
  if (onlyUpstream.length > 0) {
    said.push(`  leaves upstream carries and the port does not, in path order:`)
    said.push(...onlyUpstream.slice(0, SHOWN))
  }
  if (onlyPorted.length > 0) {
    said.push(`  leaves the port carries and upstream does not, in path order:`)
    said.push(...onlyPorted.slice(0, SHOWN))
  }
  return said
}

export function agreedIn(label: string, lines: readonly string[]): string {
  return `${label} agrees leaf for leaf over ${String(lines.length)} leaf/leaves`
}
