import type { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"

export const LuaLibFeature = {
  ArrayAt: "ArrayAt",
  ArrayConcat: "ArrayConcat",
  ArrayEntries: "ArrayEntries",
  ArrayEvery: "ArrayEvery",
  ArrayFill: "ArrayFill",
  ArrayFilter: "ArrayFilter",
  ArrayForEach: "ArrayForEach",
  ArrayFind: "ArrayFind",
  ArrayFindIndex: "ArrayFindIndex",
  ArrayFrom: "ArrayFrom",
  ArrayIncludes: "ArrayIncludes",
  ArrayIndexOf: "ArrayIndexOf",
  ArrayIsArray: "ArrayIsArray",
  ArrayJoin: "ArrayJoin",
  ArrayMap: "ArrayMap",
  ArrayPush: "ArrayPush",
  ArrayPushArray: "ArrayPushArray",
  ArrayReduce: "ArrayReduce",
  ArrayReduceRight: "ArrayReduceRight",
  ArrayReverse: "ArrayReverse",
  ArrayUnshift: "ArrayUnshift",
  ArraySort: "ArraySort",
  ArraySlice: "ArraySlice",
  ArraySome: "ArraySome",
  ArraySplice: "ArraySplice",
  ArrayToObject: "ArrayToObject",
  ArrayFlat: "ArrayFlat",
  ArrayFlatMap: "ArrayFlatMap",
  ArraySetLength: "ArraySetLength",
  ArrayToReversed: "ArrayToReversed",
  ArrayToSorted: "ArrayToSorted",
  ArrayToSpliced: "ArrayToSpliced",
  ArrayWith: "ArrayWith",
  Await: "Await",
  Class: "Class",
  ClassExtends: "ClassExtends",
  CloneDescriptor: "CloneDescriptor",
  CountVarargs: "CountVarargs",
  Date: "Date",
  Decorate: "Decorate",
  DecorateLegacy: "DecorateLegacy",
  DecorateParam: "DecorateParam",
  Delete: "Delete",
  DelegatedYield: "DelegatedYield",
  DescriptorGet: "DescriptorGet",
  DescriptorSet: "DescriptorSet",
  Error: "Error",
  FunctionBind: "FunctionBind",
  Generator: "Generator",
  InstanceOf: "InstanceOf",
  InstanceOfObject: "InstanceOfObject",
  Iterator: "Iterator",
  JSON: "JSON",
  LuaIteratorSpread: "LuaIteratorSpread",
  Map: "Map",
  MapGroupBy: "MapGroupBy",
  Match: "Match",
  MathAtan2: "MathAtan2",
  MathModf: "MathModf",
  MathSign: "MathSign",
  MathTrunc: "MathTrunc",
  New: "New",
  Number: "Number",
  NumberIsFinite: "NumberIsFinite",
  NumberIsInteger: "NumberIsInteger",
  NumberIsNaN: "NumberIsNaN",
  NumberParseInt: "ParseInt",
  NumberParseFloat: "ParseFloat",
  NumberToString: "NumberToString",
  NumberToFixed: "NumberToFixed",
  ObjectAssign: "ObjectAssign",
  ObjectDefineProperty: "ObjectDefineProperty",
  ObjectEntries: "ObjectEntries",
  ObjectFromEntries: "ObjectFromEntries",
  ObjectGetOwnPropertyDescriptor: "ObjectGetOwnPropertyDescriptor",
  ObjectGetOwnPropertyDescriptors: "ObjectGetOwnPropertyDescriptors",
  ObjectGroupBy: "ObjectGroupBy",
  ObjectKeys: "ObjectKeys",
  ObjectRest: "ObjectRest",
  ObjectValues: "ObjectValues",
  ParseFloat: "ParseFloat",
  ParseInt: "ParseInt",
  Performance: "Performance",
  Promise: "Promise",
  PromiseAll: "PromiseAll",
  PromiseAllSettled: "PromiseAllSettled",
  PromiseAny: "PromiseAny",
  PromiseRace: "PromiseRace",
  Scheduling: "Scheduling",
  Set: "Set",
  SetDescriptor: "SetDescriptor",
  SparseArrayNew: "SparseArrayNew",
  SparseArrayPush: "SparseArrayPush",
  SparseArraySpread: "SparseArraySpread",
  WeakMap: "WeakMap",
  WeakSet: "WeakSet",
  Spread: "Spread",
  StructuredClone: "StructuredClone",
  StringAccess: "StringAccess",
  StringCharAt: "StringCharAt",
  StringCharCodeAt: "StringCharCodeAt",
  StringEndsWith: "StringEndsWith",
  StringIncludes: "StringIncludes",
  StringPadEnd: "StringPadEnd",
  StringPadStart: "StringPadStart",
  StringReplace: "StringReplace",
  StringReplaceAll: "StringReplaceAll",
  StringSlice: "StringSlice",
  StringSplit: "StringSplit",
  StringStartsWith: "StringStartsWith",
  StringSubstr: "StringSubstr",
  StringSubstring: "StringSubstring",
  StringTrim: "StringTrim",
  StringTrimEnd: "StringTrimEnd",
  StringTrimStart: "StringTrimStart",
  Symbol: "Symbol",
  SymbolRegistry: "SymbolRegistry",
  TypeOf: "TypeOf",
  Unpack: "Unpack",
  Using: "Using",
  UsingAsync: "UsingAsync",
} as const
export type LuaLibFeature = (typeof LuaLibFeature)[keyof typeof LuaLibFeature]

export interface LuaLibFeatureInfo {
  dependencies?: readonly LuaLibFeature[]
  exports: readonly string[]
}

export type LuaLibModulesInfo = Record<LuaLibFeature, LuaLibFeatureInfo>

export function getLualibBundleReturn(exportedValues: readonly string[]): string {
  return `\nreturn {\n${exportedValues.map((exportName) => `  ${exportName} = ${exportName}`).join(",\n")}\n}\n`
}

export function resolveRecursiveLualibFeatures(
  features: Iterable<LuaLibFeature>,
  _luaTarget: LuaTarget,
  luaLibModulesInfo: LuaLibModulesInfo
): readonly LuaLibFeature[] {
  const loadedFeatures = new Set<LuaLibFeature>()
  const result: LuaLibFeature[] = []

  function load(feature: LuaLibFeature): undefined {
    if (loadedFeatures.has(feature)) return
    loadedFeatures.add(feature)

    const dependencies = luaLibModulesInfo[feature]?.dependencies
    if (dependencies) {
      dependencies.forEach(load)
    }

    result.push(feature)
  }

  for (const feature of features) {
    load(feature)
  }

  return result
}
