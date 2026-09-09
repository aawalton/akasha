import type { BitReaderState } from "@akasha/temper-build-hash/build-hash-bit-reader"
import { readBits } from "@akasha/temper-build-hash/build-hash-bit-reader"
import type { BitWriterState } from "@akasha/temper-build-hash/build-hash-bit-writer"
import { writeBits } from "@akasha/temper-build-hash/build-hash-bit-writer"
import type { ChampionPointId } from "@akasha/temper-champion-points/champion-point-source"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import {
  CHAMPION_POINT_BITS,
  getChampionPointId,
  getChampionPointIndex,
} from "../build-codec-indices/build-codec-indices.module.code.ts"

const CP_PASSIVE_COUNT_BITS = 7

export function encodeChampionPoints(writer: BitWriterState, build: CharacterState): undefined {
  const cp = build.championPoints

  encodeCPDiscipline(writer, cp.warfare.slotted, cp.warfare.passive)

  encodeCPDiscipline(writer, cp.fitness.slotted, cp.fitness.passive)

  encodeCPDiscipline(writer, cp.craft.slotted, cp.craft.passive)
}

function encodeCPDiscipline(
  writer: BitWriterState,
  slotted: readonly string[],
  passive: readonly string[]
): undefined {
  for (let i = 0; i < 4; i++) {
    const cpId = slotted[i] ?? ""
    writeBits(writer, getChampionPointIndex(cpId), CHAMPION_POINT_BITS)
  }

  const passiveCount = passive.length
  writeBits(writer, passiveCount, CP_PASSIVE_COUNT_BITS)
  for (const cpId of passive) {
    writeBits(writer, getChampionPointIndex(cpId), CHAMPION_POINT_BITS)
  }
}

export function decodeChampionPoints(reader: BitReaderState): CharacterState["championPoints"] {
  const warfare = decodeCPDiscipline(reader)
  const fitness = decodeCPDiscipline(reader)
  const craft = decodeCPDiscipline(reader)

  return { warfare, fitness, craft }
}

function decodeCPDiscipline(reader: BitReaderState): {
  slotted: readonly ChampionPointId[]
  passive: readonly ChampionPointId[]
} {
  const slotted: ChampionPointId[] = []
  for (let i = 0; i < 4; i++) {
    slotted.push(getChampionPointId(readBits(reader, CHAMPION_POINT_BITS)))
  }

  const passiveCount = readBits(reader, CP_PASSIVE_COUNT_BITS)
  const passive: ChampionPointId[] = []
  for (let i = 0; i < passiveCount; i++) {
    passive.push(getChampionPointId(readBits(reader, CHAMPION_POINT_BITS)))
  }

  return { slotted, passive }
}
