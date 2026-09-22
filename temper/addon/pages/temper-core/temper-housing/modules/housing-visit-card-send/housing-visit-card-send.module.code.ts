import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

interface HouseEditboxView {
  GetText: (this: HouseEditboxView) => string
}
interface HouseControlsView {
  editbox: HouseEditboxView
}
function asHouseControlsView(value: unknown): HouseControlsView {
  return value as HouseControlsView
}

interface ChatEditControlView {
  HasFocus: (this: ChatEditControlView) => boolean
  SetText: (this: ChatEditControlView, text: string) => void
}
function asChatEditControlView(value: unknown): ChatEditControlView {
  return value as ChatEditControlView
}

function calculateVCLocation(this: void): undefined {
  if (
    houseTravel.addonState.VCLocationCalculated === undefined ||
    houseTravel.addonState.VCLocationCalculated === false
  ) {
    houseTravel.addonState.VCLocationCalculated = true
  }
}
houseTravel.CalculateVCLocation = calculateVCLocation

function favoriteToVC(this: void, index: number): undefined {
  const savedVars = houseTravel.savedVars
  if (
    index !== undefined &&
    savedVars !== undefined &&
    savedVars.favorites !== undefined &&
    savedVars.favorites[index] !== undefined
  ) {
    houseTravel.SendVisitCardOf(
      savedVars.favorites[index].name,
      savedVars.favorites[index].houseId,
      houseTravel.constants.sendBasicComment
    )
  }
}
houseTravel.FavoriteToVC = favoriteToVC

function myHousesToVC(this: void, id: number): undefined {
  houseTravel.SendVisitCardOf(GetDisplayName(), id, houseTravel.constants.sendBasicComment)
}
houseTravel.MyHousesToVC = myHousesToVC

function sendVisitCardOf(this: void, name: string, houseId: number, comment: string): undefined {
  if (name !== undefined && houseId !== undefined && comment !== undefined) {
    const message =
      houseTravel.constants.sendKeyWord + name + " " + tostring(houseId) + " (" + comment + ")"
    const chat = asChatEditControlView(CHAT_SYSTEM.textEntry.editControl)
    if (chat.HasFocus() === false) {
      StartChatInput()
    }
    chat.SetText(message)
  }
}
houseTravel.SendVisitCardOf = sendVisitCardOf

function sendVisitCard(this: void): undefined {
  let name = asHouseControlsView(houseTravel.controls.house).editbox.GetText()
  const houseId = houseTravel.addonState.houseId
  if (name === undefined || zo_strtrim(name) === "") {
    name = GetDisplayName()
  }
  if (houseId !== undefined) {
    houseTravel.SendVisitCardOf(name, houseId, houseTravel.constants.sendBasicComment)
  }
}
houseTravel.SendVisitCard = sendVisitCard
