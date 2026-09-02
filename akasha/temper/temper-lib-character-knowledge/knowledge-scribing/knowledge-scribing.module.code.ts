import { asLua1Based, asNumber, asString } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import type { ScribingType } from "../knowledge-shape/knowledge-shape.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"

function asScribingType(value: ScribingType | undefined): ScribingType {
  return value as ScribingType
}

const BITS = 6

function getMaxScribingId(
  this: void,
  checkFn: (this: void, id: number) => number,
  checkRet: number
): number {
  const maxConsecutiveInvalidIds = 10
  let currentId = 1
  let invalidCount = 0
  let lastValidId = 0

  do {
    if (checkFn(currentId) === checkRet) {
      invalidCount = invalidCount + 1
    } else {
      invalidCount = 0
      lastValidId = currentId
    }
    currentId = currentId + 1
  } while (!(invalidCount >= maxConsecutiveInvalidIds))

  return lastValidId
}

INTERNAL.ScribingScanAndEncode = function (this: void): string {
  const results: string[] = []

  for (const [key, data] of pairs(INTERNAL.ScribingTypes)) {
    let result = ""

    const maxId = zo_ceil(asNumber(INTERNAL.maxIds[key]) / BITS) * BITS

    let field = 0
    for (let currentId = 1; currentId <= maxId; currentId++) {
      field = field * 2
      if (data.know(currentId)) {
        field = field + 1
      }
      if (currentId % BITS === 0) {
        result = result + LCCC.Encode(field, 1)
        field = 0
      }
    }

    results[data.order - 1] = result
  }

  return table.concat(results, ":")
}

INTERNAL.ScribingGetKnowledge = function (this: void, server, charId, key, id) {
  const resolvedServer = server ?? INTERNAL.server
  const resolvedCharId = charId ?? INTERNAL.charId

  if (resolvedServer === INTERNAL.server && resolvedCharId === INTERNAL.charId) {
    if (asScribingType(INTERNAL.ScribingTypes[key]).know(id)) {
      return INTERNAL.KNOWLEDGE_KNOWN
    } else {
      return INTERNAL.KNOWLEDGE_UNKNOWN
    }
  } else {
    const data = INTERNAL.GetCharRawData(resolvedServer, resolvedCharId, INTERNAL.CATEGORY_SCRIBING)
    if (data === undefined) {
      return INTERNAL.KNOWLEDGE_NODATA
    } else {
      const unpacked = asLua1Based([...zo_strsplit(":", LCCC.Unchunk(data))])
      if (
        LCCC.ReadBitFromEncodedData(
          asString(unpacked[asScribingType(INTERNAL.ScribingTypes[key]).order]),
          id
        )
      ) {
        return INTERNAL.KNOWLEDGE_KNOWN
      } else {
        return INTERNAL.KNOWLEDGE_UNKNOWN
      }
    }
  }
}

asScribingType(INTERNAL.ScribingTypes[INTERNAL.SCRIBE_GRIMOIRE]).max = function (
  this: void
): number {
  return getMaxScribingId(GetSkillTypeForCraftedAbilityId, SKILL_TYPE_NONE)
}

asScribingType(INTERNAL.ScribingTypes[INTERNAL.SCRIBE_SCRIPT]).max = function (this: void): number {
  return getMaxScribingId(GetCraftedAbilityScriptScribingSlot, SCRIBING_SLOT_NONE)
}
