import { RawItemTypes } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-item-types/craft-item-types.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/crafting-addon-neighbours/crafting-addon-neighbours.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-chat-message-global/temper-chat-message-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function splitLink(link: string, nr: number): number | false | undefined {
  const split: Record<number, string> = [...SplitString(":", link)]
  if (split[nr] !== undefined) {
    return tonumber(split[nr])
  } else {
    return false
  }
}

export function toChat(message: string): undefined {
  const chat = CHAT_SYSTEM.textEntry.GetText()
  StartChatInput(chat + message)
}

export function toSet(list: (string | number)[]): Record<string | number, true> {
  const set: Record<string | number, true> = {}
  for (const [, l] of ipairs(list)) {
    set[l] = true
  }
  return set
}

export function stripLink(link: string): string {
  if (CanItemLinkBeVirtual(link)) {
    return nakedLink(link)
  }

  const parts: (string | number)[] = [...SplitString(":", link)]
  const split: Record<number, string | number> = parts
  if (split[1] !== undefined) {
    split[1] = "|H0"
  }
  if (split[19] !== undefined) {
    split[19] = 0
  }
  if (split[20] !== undefined) {
    split[20] = 0
  }
  if (split[21] !== undefined) {
    split[21] = 0
  }
  if (split[22] !== undefined) {
    split[22] = "0"
  }
  return table.concat(parts, ":")
}

function nakedLink(link: string): string {
  const split: Record<number, string> = [...SplitString(":", link)]
  return "|H0:item:" + split[3] + ":0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"
}

export function texture(link: string, width?: number, height?: number): string {
  width = width === undefined ? 18 : width
  height = height === undefined ? width : height
  return "|t" + width + ":" + height + ":" + link + "|t"
}

export function updateMatsInfo(link: string): undefined {
  const account = STATE.Account
  const [itemType] = GetItemLinkItemType(link)
  if (RawItemTypes[itemType] === true && account.materials[link] === undefined) {
    const refinedLink = nakedLink(GetItemLinkRefinedMaterialItemLink(link, 0))
    account.materials[link] = { raw: true, link: refinedLink }
    account.materials[refinedLink] = { raw: false, link: link }
  }
}

export function nilCheck(
  root: object,
  defaultValue: unknown,
  ...args: (string | number)[]
): unknown {
  let current = istable(root) ? root : error("NilCheck: root is not a table")
  for (const [i, key] of ipairs(args)) {
    const next = current[key]
    if (next === undefined) {
      return defaultValue
    }
    if (i === args.length) {
      return next
    }
    current = istable(next) ? next : error("NilCheck: intermediate value is not a table")
  }

  return current
}

export function nilCheckSet(root: object, set: unknown, ...args: (string | number)[]): unknown {
  let current = istable(root) ? root : error("NilCheckSet: root is not a table")
  for (const [i, key] of ipairs(args)) {
    if (current[key] === undefined) {
      current[key] = i !== args.length ? {} : set
    }
    if (i === args.length) {
      current[key] = set
      return current[key]
    }
    const next = current[key]
    current = istable(next) ? next : error("NilCheckSet: intermediate value is not a table")
  }

  return current
}

export function isPublishedItem(itemId: number): boolean {
  const itemName: string | undefined = GetItemLinkName(
    string.format("|H1:item:%u:6:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", itemId)
  )
  return itemName !== undefined && itemName !== ""
}

export function isPublishedAchievement(achievementId: number): boolean {
  const achievementName: string | undefined = GetAchievementName(achievementId)
  return achievementName !== undefined && achievementName !== ""
}

export function filterPublishedItems(itemIds: Record<number, number>): number[] {
  const publishedItemIds: number[] = []
  for (const [, itemId] of pairs(itemIds)) {
    if (isPublishedItem(itemId)) {
      publishedItemIds.push(itemId)
    }
  }
  return publishedItemIds
}

if (TemperChatMessage !== undefined) {
  STATE.Chat = TemperChatMessage("Temper Crafting", "TC") as ChatProxy
}

export const CHAT: ChatProxy = {
  Print(str) {
    STATE.Chat.Print(str)
  },
}

export function hideControl(controlName: string): undefined {
  const control = WINDOW_MANAGER.GetControlByName(controlName)
  if (control !== undefined) {
    control.SetHidden(true)
    control.ClearAnchors()
  }
}

export const mustControl = <T extends Control = Control>(name: string): T =>
  WINDOW_MANAGER.GetControlByName<T>(name) ?? error(`TemperItemsCrafting: missing control ${name}`)
