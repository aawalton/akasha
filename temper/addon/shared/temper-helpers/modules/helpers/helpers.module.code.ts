import { asGlobalTable } from "akasha/temper/addon/shared/temper-helpers/modules/helpers-casts/helpers-casts.module.code.ts"
import {
  chunk,
  decode,
  encode,
  explode,
  implode,
  readAndDecode,
  readBitFromEncodedData,
  unchunk,
} from "akasha/temper/addon/shared/temper-helpers/modules/helpers-codec/helpers-codec.module.code.ts"
import {
  hslToRgb,
  int24ToHsl,
  int24ToInt32,
  int24ToRgb,
  int24ToRgba,
  int32ToHsla,
  int32ToInt24,
  int32ToRgba,
  rgbaToInt32,
  rgbToInt24,
} from "akasha/temper/addon/shared/temper-helpers/modules/helpers-color/helpers-color.module.code.ts"
import {
  clamp,
  compareCharIds,
  fixNumber,
  formatVersion,
  getAddOnVersion,
  getLibAddonMenu,
  getLocalizedData,
  getServerName,
  getSortedGroupMembers,
  getZoneId,
  getZoneName,
  isInDungeonTrialArena,
  matchStrings,
  monitorZoneChanges,
  registerLinkHandler,
  registerSlashCommands,
  registerString,
  runAfterInitialLoadscreen,
  tokenizeSlashCommandParameters,
} from "akasha/temper/addon/shared/temper-helpers/modules/helpers-game/helpers-game.module.code.ts"
import {
  concatTables,
  countTable,
  getSortedKeys,
  mergeTables,
  processNumericTable,
  setupOnDemandDataTable,
} from "akasha/temper/addon/shared/temper-helpers/modules/helpers-tables/helpers-tables.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const NAME = "TemperHelpers"
const VERSION = 36

export const TEMPER_HELPERS = {
  version: VERSION,

  Int24ToRGB: int24ToRgb,
  Int24ToRGBA: int24ToRgba,
  Int32ToRGBA: int32ToRgba,
  RGBToInt24: rgbToInt24,
  RGBAToInt32: rgbaToInt32,
  Int24ToInt32: int24ToInt32,
  Int32ToInt24: int32ToInt24,
  HSLToRGB: hslToRgb,
  Int24ToHSL: int24ToHsl,
  Int32ToHSLA: int32ToHsla,

  Encode: encode,
  Decode: decode,
  ReadAndDecode: readAndDecode,
  ReadBitFromEncodedData: readBitFromEncodedData,
  Implode: implode,
  Explode: explode,
  Chunk: chunk,
  Unchunk: unchunk,

  GetServerName: getServerName,
  RunAfterInitialLoadscreen: runAfterInitialLoadscreen,
  MonitorZoneChanges: monitorZoneChanges,
  GetZoneId: getZoneId,
  GetZoneName: getZoneName,
  IsInDungeonTrialArena: isInDungeonTrialArena,
  RegisterSlashCommands: registerSlashCommands,
  TokenizeSlashCommandParameters: tokenizeSlashCommandParameters,
  CompareCharIds: compareCharIds,
  FixNumber: fixNumber,
  MatchStrings: matchStrings,
  RegisterString: registerString,
  GetLocalizedData: getLocalizedData,
  GetSortedGroupMembers: getSortedGroupMembers,
  GetAddOnVersion: getAddOnVersion,
  FormatVersion: formatVersion,
  RegisterLinkHandler: registerLinkHandler,
  GetLibAddonMenu: getLibAddonMenu,
  Clamp: clamp,

  GetSortedKeys: getSortedKeys,
  CountTable: countTable,
  ProcessNumericTable: processNumericTable,
  MergeTables: mergeTables,
  ConcatTables: concatTables,
  SetupOnDemandDataTable: setupOnDemandDataTable,
}

asGlobalTable(_G)[NAME] = TEMPER_HELPERS
