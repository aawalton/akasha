import { newAlchemyParser } from "../writ-alchemy-parser/writ-alchemy-parser.module.code.ts"
import { newEnchantingParser } from "../writ-enchanting-parser/writ-enchanting-parser.module.code.ts"
import { str } from "../writ-i18n/writ-i18n.module.code.ts"
import { listTotal } from "../writ-mat-row/writ-mat-row.module.code.ts"
import { newProvisioningParser } from "../writ-prov-parser/writ-prov-parser.module.code.ts"
import { newSmithingParser } from "../writ-smith-parser/writ-smith-parser.module.code.ts"
import type { KnowList, MatList, Parser } from "../writ-types/writ-types.module.code.ts"
import { fail, round } from "../writ-util/writ-util.module.code.ts"
import { toWritFields } from "../writ-writ-fields/writ-writ-fields.module.code.ts"

type ParserFactory = (this: void) => Parser

const ICON_TO_PARSER: Record<string, ParserFactory> = {
  "/esoui/art/icons/master_writ_blacksmithing.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_clothier.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_woodworking.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_jewelry.dds": newSmithingParser,
  "/esoui/art/icons/master_writ_alchemy.dds": newAlchemyParser,
  "/esoui/art/icons/master_writ_enchanting.dds": newEnchantingParser,
  "/esoui/art/icons/master_writ_provisioning.dds": newProvisioningParser,
}

export function createParser(this: void, itemLink: string): Parser | undefined {
  const [icon] = GetItemLinkInfo(itemLink)
  const parserFactory = ICON_TO_PARSER[icon]
  if (parserFactory === undefined) {
    return undefined
  }
  return parserFactory()
}

export function toMatKnowList(
  this: void,
  itemLink: string
): LuaMultiReturn<
  [matList: MatList | undefined, knowList: KnowList | undefined, parser: Parser | undefined]
> {
  const parser = createParser(itemLink)
  if (parser === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  if (parser.ParseItemLink(itemLink) === undefined) {
    fail("TemperWrit: " + (str("err_could_not_parse") ?? ""))
    return $multi(undefined, undefined, parser)
  }
  const matList = parser.ToMatList()
  const knowList: KnowList | undefined = parser.ToKnowList()
  return $multi(matList, knowList, parser)
}

export function toMatCost(this: void, itemLink: string): number | undefined {
  const sv: TemperWritSavedVariables = TemperWrit.savedVariables ?? {}
  const saveMatListChat = sv["enable_mat_list_chat"]
  sv["enable_mat_list_chat"] = undefined

  const [matList] = toMatKnowList(itemLink)
  const matTotal = listTotal(matList)

  sv["enable_mat_list_chat"] = saveMatListChat
  return round(matTotal)
}

export function toVoucherCount(this: void, itemLink: string): number {
  const fields = toWritFields(itemLink)
  const [quotient, remainder] = math.modf((fields.writ_reward ?? 0) / 10000)
  const writcount = quotient + math.floor(0.5 + remainder)
  return writcount
}

export function toLinkBaseText(this: void, itemLink: string | undefined): string | undefined {
  if (itemLink === undefined) {
    return undefined
  }
  const baseText = GenerateMasterWritBaseText(itemLink)
  const writText = GenerateMasterWritRewardText(itemLink)
  const [reqText] = string.gsub(baseText, ".*\n", "")
  return itemLink + "\t" + reqText + "\t" + writText
}

export function uniqueID(this: void, bagId: number, slotIndex: number): string {
  const id64 = GetItemUniqueId(bagId, slotIndex)
  if (id64 === undefined) {
    return ""
  }
  const uniqueId = Id64ToString(id64)
  return uniqueId
}

export interface ScannedWrit {
  item_link: string
  parser: Parser
  uniqueId: string
}

export function scanInventoryForMasterWrits(this: void): ScannedWrit[] {
  const resultList: ScannedWrit[] = []
  const sv = TemperWrit.savedVariables ?? {}
  let bagList = [BAG_BACKPACK]
  if (sv.enable_banked_vouchers === true) {
    bagList = [BAG_BACKPACK, BAG_BANK, BAG_SUBSCRIBER_BANK]
  }

  const saveMatListChat = sv.enable_mat_list_chat
  sv.enable_mat_list_chat = undefined

  for (const bagId of bagList) {
    const slotCt = GetBagSize(bagId)
    for (let slotIndex = 0; slotIndex <= slotCt; slotIndex = slotIndex + 1) {
      const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT)
      let parser = createParser(itemLink)
      if (parser === undefined || parser.ParseItemLink(itemLink) === undefined) {
        parser = undefined
      }
      if (parser !== undefined) {
        const uniqueId = uniqueID(bagId, slotIndex)
        const inventoryData: ScannedWrit = {
          item_link: itemLink,
          parser,
          uniqueId,
        }
        resultList[resultList.length] = inventoryData
      }
    }
  }

  sv.enable_mat_list_chat = saveMatListChat
  return resultList
}

TemperWrit.ICON_TO_PARSER = ICON_TO_PARSER
TemperWrit.CreateParser = createParser
TemperWrit.ToMatKnowList = toMatKnowList
TemperWrit.ToMatCost = toMatCost
TemperWrit.ToVoucherCount = toVoucherCount
TemperWrit.ToLinkBaseText = toLinkBaseText
TemperWrit.ScanInventoryForMasterWrits = scanInventoryForMasterWrits
TemperWrit.UniqueID = uniqueID
