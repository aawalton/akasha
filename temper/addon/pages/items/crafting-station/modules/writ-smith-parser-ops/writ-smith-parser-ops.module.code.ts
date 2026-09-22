import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { PUBLIC as CHARACTER_KNOWLEDGE } from "akasha/temper/addon/pages/items/crafting-station/modules/knowledge-state/knowledge-state.module.code.ts"
import { newKnow } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-know/writ-know.module.code.ts"
import {
  add as logAdd,
  startNewEvent as logStartNewEvent,
  warn as logWarn,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-log/writ-log.module.code.ts"
import {
  matRowFromLink,
  matRowFromName,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mat-row/writ-mat-row.module.code.ts"
import type {
  SetBonus,
  SmithingParser,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-smith-parser-types/writ-smith-parser-types.module.code.ts"
import { REQUEST_ITEMS } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-smith-request-items/writ-smith-request-items.module.code.ts"
import {
  QUALITY,
  QUALITY_JEWELRY,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-smith-schema/writ-smith-schema.module.code.ts"
import type { School } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-smith-schema-types/writ-smith-schema-types.module.code.ts"
import type {
  Know,
  KnowList,
  MatList,
  MatRow,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-types/writ-types.module.code.ts"
import { KNOW } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-types/writ-types.module.code.ts"
import {
  fail,
  red,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-util/writ-util.module.code.ts"
import { toWritFields } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-writ-fields/writ-writ-fields.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-global/writ-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"

type MatRowMimic = MatRow & { can_mimic?: boolean }

let client_lang: string | undefined

type SetInfo = {
  setNames?: Record<string, string | undefined>
  traitsNeeded?: number
}

function asSetInfo(this: void, value: { [key: string]: unknown }): SetInfo {
  return value as SetInfo
}

export function getSetBonus(this: void, _parser: SmithingParser, setId: number): SetBonus {
  const r: SetBonus = { name: undefined, trait_ct: undefined, set_id: undefined }
  if (client_lang === undefined) {
    client_lang = GetCVar("language.2")
  }
  const si = lib.GetSetInfo(setId)
  if (si !== undefined) {
    const info = asSetInfo(si)
    if (info.setNames !== undefined) {
      r.name = info.setNames[client_lang] ?? info.setNames["en"]
    }
    r.trait_ct = info.traitsNeeded
  } else {
    r.name = "Unknown Set " + tostring(setId)
    r.trait_ct = 0
    logWarn("no set data for set_id:" + tostring(setId) + ", using hardcoded: " + tostring(r.name))
  }
  const langRaw = TemperWrit.savedVariables?.lang
  const lang = typeof langRaw === "string" ? langRaw : undefined
  const forced = lib.GetSetName(setId, lang)
  r.name = typeof forced === "string" ? forced : r.name

  if (r.set_id == null) {
    r.set_id = setId
  }
  return r
}

export function parseItemLink(
  this: void,
  parser: SmithingParser,
  itemLink: string
): SmithingParser | undefined {
  logStartNewEvent("ParseItemLink: %s %s", parser.class, itemLink)
  const fields = toWritFields(itemLink)
  const itemNum = fields.writ1
  const qualityNum = fields.writ3
  const setNum = fields.writ4
  const traitNum = fields.writ5
  const motifNum = fields.writ6

  parser.request_item = itemNum !== undefined ? REQUEST_ITEMS[itemNum] : undefined
  const requestItem = parser.request_item
  if (requestItem === undefined) {
    return undefined
  }
  if (requestItem.tr == null) {
    const gear = TemperWrit.Gear
    requestItem.tr = requestItem.item_name
    requestItem.item_name =
      (gear !== undefined ? gear(requestItem.example_item_id) : undefined) ?? requestItem.item_name
  }
  logAdd("request_item", tostring(itemNum) + " " + tostring(requestItem.item_name))
  parser.crafting_type = requestItem.school.trade_skill_type
  parser.set_bonus = getSetBonus(parser, setNum ?? 0)
  if (parser.set_bonus === undefined) {
    return fail("set not found " + tostring(setNum))
  }
  logAdd("set_bonus", parser.set_bonus)

  const trait = requestItem.trait_set[traitNum ?? 0]
  parser.trait = trait
  parser.trait_num = traitNum
  if (trait !== undefined) {
    const si = TemperWrit.SI
    if (trait.trait_name == null) {
      trait.trait_name = si !== undefined ? si("SI_ITEMTRAITTYPE" + tostring(traitNum)) : undefined
    }
    if (trait.mat_link == null) {
      trait.mat_link = GetSmithingTraitItemLink((traitNum ?? 0) + 1, LINK_STYLE_DEFAULT)
    }
  }
  logAdd("trait", parser.trait)

  parser.motif_num = motifNum
  parser.motif = undefined
  if (motifNum !== undefined && 0 < motifNum) {
    const motifName = TemperWrit.Motif
    parser.motif = {
      motif_num: motifNum,
      motif_name: motifName !== undefined ? motifName(motifNum) : undefined,
      mat_item_link: GetItemStyleMaterialLink(motifNum, LINK_STYLE_DEFAULT),
    }
  }
  logAdd("motif", parser.motif)

  if (requestItem.school.motif_required) {
    if (parser.motif === undefined) {
      return fail("motif not found " + tostring(motifNum))
    }
  } else {
    parser.motif_num = undefined
  }
  if (parser.crafting_type === CRAFTING_TYPE_JEWELRYCRAFTING) {
    parser.improve_level = qualityNum !== undefined ? QUALITY_JEWELRY[qualityNum] : undefined
  } else {
    parser.improve_level = qualityNum !== undefined ? QUALITY[qualityNum] : undefined
  }
  logAdd("improve", parser.improve_level)
  if (parser.improve_level === undefined) {
    return fail("quality not found " + tostring(qualityNum))
  }
  return parser
}

export function toMatList(this: void, parser: SmithingParser): MatList {
  const requestItem = parser.request_item
  const improveLevel = parser.improve_level
  const trait = parser.trait
  if (requestItem === undefined || improveLevel === undefined || trait === undefined) {
    parser.mat_list = []
    return parser.mat_list
  }
  const ml: MatList = []
  const base = matRowFromName(requestItem.school.base_mat_name, requestItem.base_mat_ct)
  if (base !== undefined) {
    ml[ml.length] = base
  }
  if (trait.mat_link !== undefined) {
    const traitRow = matRowFromLink(trait.mat_link)
    if (traitRow !== undefined) {
      ml[ml.length] = traitRow
    }
  }
  if (parser.motif !== undefined && parser.motif.mat_item_link !== undefined) {
    const matRow = matRowFromLink(parser.motif.mat_item_link)
    if (matRow !== undefined) {
      const mimicRow: MatRowMimic = matRow
      mimicRow.can_mimic = true
      ml[ml.length] = matRow
    }
  }
  if (0 < improveLevel.green_mat_ct) {
    const row = matRowFromName(requestItem.school.green_mat_name, improveLevel.green_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improveLevel.blue_mat_ct) {
    const row = matRowFromName(requestItem.school.blue_mat_name, improveLevel.blue_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improveLevel.purple_mat_ct) {
    const row = matRowFromName(requestItem.school.purple_mat_name, improveLevel.purple_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improveLevel.gold_mat_ct) {
    const row = matRowFromName(requestItem.school.gold_mat_name, improveLevel.gold_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  parser.mat_list = ml
  return parser.mat_list
}

export function toKnowList(this: void, parser: SmithingParser): KnowList {
  logStartNewEvent("ToKnowList: %s", parser.class)
  const r: KnowList = []
  const requestItem = parser.request_item
  if (requestItem === undefined) {
    return r
  }

  const strLookup = TemperWrit.Str
  const str = (key: string): string => (strLookup !== undefined ? strLookup(key) : undefined) ?? ""

  if (requestItem.school.motif_required && parser.motif !== undefined) {
    const rr = CHARACTER_KNOWLEDGE.GetMotifKnowledgeForCharacter(
      parser.motif.motif_num,
      requestItem.motif_page ?? 0
    )
    const motifKnown = rr === CHARACTER_KNOWLEDGE.KNOWLEDGE_KNOWN

    const parsedMotifName = parser.motif.motif_name
    const title = "motif " + tostring(parsedMotifName)
    const fmt = str("know_err_motif")
    const msg = string.format(fmt, tostring(parsedMotifName))
    r[r.length] = newKnow({
      name: title,
      is_known: motifKnown,
      lack_msg: msg,
      how: KNOW.MOTIF,
    })
  }

  const trait = parser.trait
  const researchLine = requestItem.research_line ?? 0
  const [rawLineName] = GetSmithingResearchLineInfo(
    requestItem.school.trade_skill_type,
    researchLine
  )
  const lineName = string.lower(rawLineName)
  logAdd(
    "GetSmithingResearchLineInfo(" +
      "skill=" +
      tostring(requestItem.school.trade_skill_type) +
      ", line=" +
      tostring(researchLine) +
      ") = " +
      tostring(lineName)
  )
  if (trait !== undefined) {
    const [, , traitKnown] = GetSmithingResearchLineTraitInfo(
      requestItem.school.trade_skill_type,
      researchLine,
      trait.trait_index
    )
    logAdd(
      "GetSmithingResearchLineTraitInfo(" +
        "skill=" +
        tostring(requestItem.school.trade_skill_type) +
        ", line=" +
        tostring(researchLine) +
        ", trait=" +
        tostring(trait.trait_index) +
        ") = " +
        tostring(traitKnown)
    )
    const traitName = trait.trait_name
    const title = "trait " + tostring(traitName) + " " + lineName
    const fmt = str("know_err_trait")
    const msg = string.format(fmt, tostring(traitName), lineName)
    r[r.length] = newKnow({
      name: title,
      is_known: traitKnown,
      lack_msg: msg,
      how: KNOW.TRAIT,
    })
  }

  const setBonus = parser.set_bonus
  if (setBonus !== undefined && setBonus.trait_ct !== undefined) {
    let knownTraitCt = 0
    const knownT: number[] = []
    for (const [, traitRow] of pairs(requestItem.trait_set)) {
      if (traitRow !== undefined) {
        const [, , known] = GetSmithingResearchLineTraitInfo(
          requestItem.school.trade_skill_type,
          researchLine,
          traitRow.trait_index
        )
        let value = 0
        if (known) {
          value = 1
        }
        knownTraitCt = knownTraitCt + value
        knownT[traitRow.trait_index] = value
      }
    }
    logAdd(
      "known traits for " +
        "GSRLTI(skill=" +
        tostring(requestItem.school.trade_skill_type) +
        ", line=" +
        tostring(researchLine) +
        ", trait_index=?):" +
        table.concat(knownT, " ")
    )
    const title = tostring(setBonus.trait_ct) + " traits for set bonus"
    const msg = string.format(
      str("know_err_trait_ct_too_low"),
      knownTraitCt,
      setBonus.trait_ct,
      tostring(setBonus.name)
    )
    r[r.length] = newKnow({
      name: title,
      is_known: setBonus.trait_ct <= knownTraitCt,
      lack_msg: msg,
      how: KNOW.TRAIT_CT_FOR_SET,
    })
  }

  const improveLevel = parser.improve_level
  if (improveLevel !== undefined && improveLevel.index === 5) {
    const skill = requestItem.school.temper_skill
    const know: Know = skill.ToKnow()
    know.is_warn = true
    r[r.length] = know
  }

  return r
}

export function warningText(this: void, parser: SmithingParser): string | undefined {
  if (parser.motif !== undefined) {
    return undefined
  }
  const school: (School & { motif_require?: boolean }) | undefined = parser.request_item?.school
  if (parser.request_item !== undefined && school !== undefined && school.motif_require !== true) {
    return undefined
  }
  return red("Unknown motif: " + tostring(parser.motif_num))
}
