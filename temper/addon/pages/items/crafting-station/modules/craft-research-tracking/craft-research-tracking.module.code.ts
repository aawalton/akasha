import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function updateTrackingStatus(char: string): undefined {
  const account = STATE.Account
  const studies =
    STATE.Account.crafting.studies[char] ?? error("TemperItemsCrafting: missing studies table")
  let allTracked = true
  for (const [, craftData] of pairs(studies)) {
    for (const [, lineData] of pairs(craftData)) {
      for (const [, traitTracked] of pairs(lineData)) {
        if (traitTracked !== true) {
          allTracked = false
          break
        }
      }
      if (!allTracked) {
        break
      }
    }
    if (!allTracked) {
      break
    }
  }
  account.trait.tracking[char] = allTracked
}

function countLine(this: void, phrase: string, count: number, self: boolean): string {
  if (count === 0) {
    return ""
  }
  const others = count - 1
  let whom: string
  if (!self) {
    whom = count === 1 ? "1 character" : `${count} characters`
  } else if (others === 0) {
    whom = "this character"
  } else {
    whom = others === 1 ? "this character and 1 other" : `this character and ${others} others`
  }
  return `|cC5C29E${phrase} ${whom}|r`
}

export function needCount(
  need: string[],
  unneed: string[],
  self: boolean,
  needPhrase: string,
  unneedPhrase: string
): LuaMultiReturn<[string, string, string]> {
  return $multi(
    countLine(needPhrase, need.length, self),
    countLine(unneedPhrase, unneed.length, false),
    ""
  )
}

export function needAppend(
  need: string[],
  unneed: string[],
  researching?: string[]
): LuaMultiReturn<[string, string, string]> {
  if (researching === undefined) {
    researching = []
  }
  const account = STATE.Account
  const sorter = (a: string, b: string): boolean => string.lower(a) < string.lower(b)
  let needStr = ""
  if (need.length !== 0) {
    table.sort(need, sorter)
    needStr = `|t20:20:esoui/art/buttons/decline_up.dds|t ${
      account.options.displaycount ? string.format("(%d) ", need.length) : ""
    }${table.concat(need, ", ")}`
  }
  let unneedStr = ""
  if (unneed.length !== 0) {
    table.sort(unneed, sorter)
    unneedStr = `|t20:20:esoui/art/buttons/accept_up.dds|t ${
      account.options.displaycount ? string.format("(%d) ", unneed.length) : ""
    }${table.concat(unneed, ", ")}`
  }
  let researchingStr = ""
  if (researching.length !== 0) {
    table.sort(researching, sorter)
    researchingStr = `|t23:23:esoui/art/miscellaneous/timer_32.dds|t  ${
      account.options.displaycount ? string.format("(%d) ", researching.length) : ""
    }${table.concat(researching, ", ")}`
  }
  return $multi(needStr, unneedStr, researchingStr)
}
