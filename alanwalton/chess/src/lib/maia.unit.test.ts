import { describe, expect, test } from "bun:test"
import {
  clampMaiaBand,
  MAIA_MAX_BAND,
  MAIA_MIN_BAND,
  maiaOptions,
  maiaSearchCommands,
  maiaWeightsFilename,
} from "./maia"

describe("clampMaiaBand", () => {
  test("rounds to the nearest 100-Elo band", () => {
    expect(clampMaiaBand(1500)).toBe(1500)
    expect(clampMaiaBand(1487)).toBe(1500)
    expect(clampMaiaBand(1449)).toBe(1400)
    expect(clampMaiaBand(1550)).toBe(1600)
  })
  test("clamps below the floor and above the ceiling", () => {
    expect(clampMaiaBand(900)).toBe(MAIA_MIN_BAND)
    expect(clampMaiaBand(1050)).toBe(MAIA_MIN_BAND)
    expect(clampMaiaBand(2000)).toBe(MAIA_MAX_BAND)
    expect(clampMaiaBand(3000)).toBe(MAIA_MAX_BAND)
  })
  test("the band bounds are the documented Maia range", () => {
    expect(MAIA_MIN_BAND).toBe(1100)
    expect(MAIA_MAX_BAND).toBe(1900)
  })
})

describe("maiaWeightsFilename", () => {
  test("is the per-band gzipped protobuf network name", () => {
    expect(maiaWeightsFilename(1500)).toBe("maia-1500.pb.gz")
    expect(maiaWeightsFilename(1100)).toBe("maia-1100.pb.gz")
  })
})

describe("maiaOptions — self-hosted, no external API", () => {
  test("loads the local weights file via a UCI setoption, referencing only a filesystem path", () => {
    const opts = maiaOptions("/home/walton/.local/share/maia/maia-1500.pb.gz")
    expect(opts).toEqual([
      "setoption name WeightsFile value /home/walton/.local/share/maia/maia-1500.pb.gz",
    ])
    for (const line of opts) {
      expect(line).not.toMatch(/https?:\/\//)
    }
  })
})

describe("maiaSearchCommands — human-like single-node search", () => {
  test("sets the position and searches exactly one node (raw policy move)", () => {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    expect(maiaSearchCommands(fen)).toEqual([`position fen ${fen}`, "go nodes 1"])
  })
  test("never uses depth/movetime search (that would erase the human-like play)", () => {
    const cmds = maiaSearchCommands("8/8/8/8/8/8/8/K6k w - - 0 1")
    expect(cmds.some((c) => c.includes("go nodes 1"))).toBe(true)
    expect(cmds.some((c) => c.includes("go depth") || c.includes("go movetime"))).toBe(false)
  })
})
