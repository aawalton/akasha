import { asGlobalTable } from "akasha/temper/addon/shared/lccc/modules/lccc-casts/lccc-casts.module.code.ts"
import {
  chunk,
  decode,
  encode,
  explode,
  implode,
  readAndDecode,
  readBitFromEncodedData,
  unchunk,
} from "akasha/temper/addon/shared/lccc/modules/lccc-codec/lccc-codec.module.code.ts"
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
} from "akasha/temper/addon/shared/lccc/modules/lccc-color/lccc-color.module.code.ts"
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
} from "akasha/temper/addon/shared/lccc/modules/lccc-util/lccc-util.module.code.ts"
import {
  concatTables,
  countTable,
  getSortedKeys,
  mergeTables,
  processNumericTable,
  setupOnDemandDataTable,
} from "akasha/temper/addon/shared/lccc/modules/lccc-util-tables/lccc-util-tables.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const NAME = "TemperCodesCommonCode"
const VERSION = 36

export const LCCC = {
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

asGlobalTable(_G)[NAME] = LCCC
