import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

interface HouseControls {
  editbox: EditControl
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

function parseCmd(this: void, cmd: string, param: string): LuaMultiReturn<[string, string]> {
  param = zo_strtrim(param)
  cmd = zo_strtrim(cmd)

  const [cmdIndex] = string.find(param, " ")
  if (cmdIndex !== undefined) {
    cmd = zo_strtrim(string.sub(param, 1, cmdIndex))
    param = zo_strtrim(string.sub(param, cmdIndex + 1))
  } else {
    cmd = param
    param = ""
  }
  return $multi(cmd, param)
}
houseTravel.ParseCmd = parseCmd

function portToMainResidence(this: void): undefined {
  const house = asHouseControls(houseTravel.controls.house)
  let name = house.editbox.GetText()
  if (
    string.lower(name) === string.lower(GetUnitName("player")) ||
    string.lower(name) === string.lower(GetDisplayName()) ||
    name === undefined ||
    zo_strtrim(name) === ""
  ) {
    name = GetDisplayName()
  }
  houseTravel.JumpToDefaultHouse(name)
}
houseTravel.PortToMainResidence = portToMainResidence

function jumpToDefaultHouse(this: void, player: string): undefined {
  if (player !== undefined && player !== "") {
    if (player === GetDisplayName() || player === undefined || zo_strtrim(player) === "") {
    } else {
      JumpToHouse(player)
    }
  }
}
houseTravel.JumpToDefaultHouse = jumpToDefaultHouse
