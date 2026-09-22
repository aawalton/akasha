import {
  asEncodedValue,
  asLuaArray,
} from "akasha/temper/addon/pages/combat/modules/data-encode-casts/data-encode-casts.module.code.ts"
import type {
  DictionaryClass,
  DictionaryInstance,
  EncodedValue,
  LuaTable,
} from "akasha/temper/addon/pages/combat/modules/data-encode-types/data-encode-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const DICTIONARY_OBJECT = ZO_InitializingObject.Subclass<DictionaryClass>()

DICTIONARY_OBJECT.Initialize = function (
  this: DictionaryInstance,
  data: unknown,
  globalDictionary?: EncodedValue[]
): undefined {
  this.globalDictReverse = {}
  if (globalDictionary !== undefined) {
    for (let k = 1; k <= globalDictionary.length; k++) {
      this.globalDictReverse[asEncodedValue(globalDictionary[k - 1])] = k
    }
  }
  this.dictionary = []
  this.counts = [{}, {}, {}]
  this.ScanTable(data)

  const counts3 = this.counts[2]
  const keys: EncodedValue[] = []
  for (const key in counts3) {
    keys.push(asEncodedValue(key))
  }
  keys.sort((a, b) => (counts3[b] as number) - (counts3[a] as number))
  for (const key of keys) {
    this.dictionary.push(key)
  }
}

DICTIONARY_OBJECT.ScanTable = function (this: DictionaryInstance, data: unknown): undefined {
  const table = data as LuaTable
  const isArray = type(data) === "table" && asLuaArray(data).length === NonContiguousCount(table)
  for (const k in table) {
    const v = table[k]
    if (!isArray && this.ValidateValue(k)) {
      this.IncreaseCount(asEncodedValue(k))
    }
    if (this.ValidateValue(v)) {
      this.IncreaseCount(asEncodedValue(v))
    }
  }
}

DICTIONARY_OBJECT.ValidateValue = function (this: DictionaryInstance, value: unknown): boolean {
  if (this.globalDictReverse[asEncodedValue(value)] !== undefined) {
    return false
  }
  if (type(value) === "number") {
    const num = value as number
    if (math.floor(num) === num) {
      return num > 100 || num < 0
    }
    return string.len(tostring(value)) > 2
  }
  if (type(value) === "string") {
    return string.len(tostring(value)) > 2
  }
  if (type(value) === "table") {
    this.ScanTable(value)
  }
  return false
}

DICTIONARY_OBJECT.IncreaseCount = function (
  this: DictionaryInstance,
  value: EncodedValue
): undefined {
  const counts = this.counts
  if (counts[0][value] === undefined) {
    counts[0][value] = true
  } else if (counts[1][value] === undefined) {
    counts[1][value] = true
  } else if (counts[2][value] === undefined) {
    counts[2][value] = 3
  } else {
    counts[2][value] = (counts[2][value] as number) + 1
  }
}

export function makeDictionary(
  this: void,
  data: unknown,
  globalDictionary?: EncodedValue[]
): EncodedValue[] {
  if (type(data) !== "table") {
    return []
  }
  const dict = DICTIONARY_OBJECT.New(data, globalDictionary)
  return dict.dictionary
}
