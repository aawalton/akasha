import {
  type Beats,
  beatsIn,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

export function beatsOf(...lines: readonly object[]): Beats {
  const read = beatsIn(lines.map((one) => JSON.stringify(one)).join("\n"))
  if ("refused" in read) throw new Error(read.refused)
  return read
}
