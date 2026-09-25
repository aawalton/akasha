import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export interface ControlCharSpec {
  name: string
  length?: number
  decoder?: string
}

export type EncodedValue = string | number

export type LuaTable = Record<string | number, unknown>

export type LuaArray = unknown[]

export type EncodedValueArray = EncodedValue[]

export interface TestResult {
  testDictGlobal?: EncodedValue[]
  encoded?: string[]
  decoded?: unknown
  dict?: EncodedValue[]
  result?: boolean
  encoder?: EncodeInstance
  decoder?: DecodeInstance
}

export interface DictionaryInstance {
  globalDictReverse: LuaTable
  dictionary: EncodedValue[]
  counts: [LuaTable, LuaTable, LuaTable]
  Initialize: (this: DictionaryInstance, data: unknown, globalDictionary?: EncodedValue[]) => void
  ScanTable: (this: DictionaryInstance, data: unknown) => void
  ValidateValue: (this: DictionaryInstance, value: unknown) => boolean
  IncreaseCount: (this: DictionaryInstance, value: EncodedValue) => void
  [key: string]: unknown
}

export interface DictionaryClass {
  Subclass: (this: DictionaryClass) => DictionaryClass
  New: (
    this: DictionaryClass,
    data: unknown,
    globalDictionary?: EncodedValue[]
  ) => DictionaryInstance
  Initialize: (this: DictionaryInstance, data: unknown, globalDictionary?: EncodedValue[]) => void
  ScanTable: (this: DictionaryInstance, data: unknown) => void
  ValidateValue: (this: DictionaryInstance, value: unknown) => boolean
  IncreaseCount: (this: DictionaryInstance, value: EncodedValue) => void
  [key: string]: unknown
}

export interface EncodeInstance {
  data: unknown
  encodedStrings: string[]
  currentString: string
  currentStringLength: number
  globalDictionary: EncodedValue[] | undefined
  dictionary: EncodedValue[]
  reverseDictionary: LuaTable | undefined
  Initialize: (
    this: EncodeInstance,
    data: unknown,
    localDictionary?: EncodedValue[] | true,
    globalDictionary?: EncodedValue[]
  ) => void
  InitDictionary: (this: EncodeInstance, localDictionary: EncodedValue[] | true) => void
  MakeReverseDictionary: (this: EncodeInstance) => void
  AddString: (this: EncodeInstance, str: string) => void
  AddInteger: (this: EncodeInstance, integer: number) => void
  NewLine: (this: EncodeInstance) => void
  EncodeDictionary: (this: EncodeInstance, dictionary: EncodedValue[]) => void
  CheckForStringId: (this: EncodeInstance, value: unknown) => number | undefined
  EncodeItem: (this: EncodeInstance, value: unknown) => void
  EncodeArray: (this: EncodeInstance, array: unknown) => void
  EncodeTable: (this: EncodeInstance, table: unknown) => void
  [key: string]: unknown
}

export interface EncodeClass {
  Subclass: (this: EncodeClass) => EncodeClass
  New: (
    this: EncodeClass,
    data: unknown,
    localDictionary?: EncodedValue[] | true,
    globalDictionary?: EncodedValue[]
  ) => EncodeInstance
  Initialize: (
    this: EncodeInstance,
    data: unknown,
    localDictionary?: EncodedValue[] | true,
    globalDictionary?: EncodedValue[]
  ) => void
  InitDictionary: (this: EncodeInstance, localDictionary: EncodedValue[] | true) => void
  MakeReverseDictionary: (this: EncodeInstance) => void
  AddString: (this: EncodeInstance, str: string) => void
  AddInteger: (this: EncodeInstance, integer: number) => void
  NewLine: (this: EncodeInstance) => void
  EncodeDictionary: (this: EncodeInstance, dictionary: EncodedValue[]) => void
  CheckForStringId: (this: EncodeInstance, value: unknown) => number | undefined
  EncodeItem: (this: EncodeInstance, value: unknown) => void
  EncodeArray: (this: EncodeInstance, array: unknown) => void
  EncodeTable: (this: EncodeInstance, table: unknown) => void
  [key: string]: unknown
}

export interface DecodeInstance {
  encodedStrings: readonly string[]
  currentStringIndex: number
  currentStringPos: number
  currentString: string | undefined
  currentStringLength: number | undefined
  dictionary: EncodedValue[]
  data: unknown
  Initialize: (
    this: DecodeInstance,
    encodedData: readonly string[],
    globalDict?: EncodedValue[]
  ) => void
  InitDictionary: (this: DecodeInstance, globalDict?: EncodedValue[]) => void
  GetCurrentString: (this: DecodeInstance) => string | undefined
  GetNextChar: (this: DecodeInstance, noPosIncrement?: boolean) => string
  GetEncodedItem: (this: DecodeInstance, length?: number) => string
  MoveCurrentPos: (this: DecodeInstance, offset: number) => void
  DecodeItem: (this: DecodeInstance) => unknown
  DecodeBool: (this: DecodeInstance, controlChar: string) => boolean | undefined
  DecodeStringId: (this: DecodeInstance, controlChar: string) => EncodedValue
  DecodeBase: (this: DecodeInstance, encodedItem: string) => number
  DecodeString: (this: DecodeInstance, controlChar: string) => string
  DecodeArray: (this: DecodeInstance) => unknown[]
  DecodeTable: (this: DecodeInstance) => LuaTable
  DecodeInteger: (this: DecodeInstance) => number
  DecodeNumeric: (this: DecodeInstance) => number | undefined
  [key: string]: unknown
}

export interface DecodeClass {
  Subclass: (this: DecodeClass) => DecodeClass
  New: (
    this: DecodeClass,
    encodedData: readonly string[],
    globalDict?: EncodedValue[]
  ) => DecodeInstance
  Initialize: (
    this: DecodeInstance,
    encodedData: readonly string[],
    globalDict?: EncodedValue[]
  ) => void
  InitDictionary: (this: DecodeInstance, globalDict?: EncodedValue[]) => void
  GetCurrentString: (this: DecodeInstance) => string | undefined
  GetNextChar: (this: DecodeInstance, noPosIncrement?: boolean) => string
  GetEncodedItem: (this: DecodeInstance, length?: number) => string
  MoveCurrentPos: (this: DecodeInstance, offset: number) => void
  DecodeItem: (this: DecodeInstance) => unknown
  DecodeBool: (this: DecodeInstance, controlChar: string) => boolean | undefined
  DecodeStringId: (this: DecodeInstance, controlChar: string) => EncodedValue
  DecodeBase: (this: DecodeInstance, encodedItem: string) => number
  DecodeString: (this: DecodeInstance, controlChar: string) => string
  DecodeArray: (this: DecodeInstance) => unknown[]
  DecodeTable: (this: DecodeInstance) => LuaTable
  DecodeInteger: (this: DecodeInstance) => number
  DecodeNumeric: (this: DecodeInstance) => number | undefined
  [key: string]: unknown
}

export interface LibSurface {
  debug: boolean
  internal: LuaTable
  charsetConfig: {
    charset: string
    valueToChar: Record<number, string>
    charToValue: Record<string, number>
  }
  Encode: (
    this: void,
    data: unknown,
    localDict?: EncodedValue[] | true,
    globalDict?: EncodedValue[]
  ) => string[]
  Decode: <T = unknown>(
    this: void,
    encodedData: readonly string[],
    globalDict?: EncodedValue[]
  ) => LuaMultiReturn<[T, EncodedValue[]]>
  MakeDictionary: (this: void, data: unknown, globalDictionary?: EncodedValue[]) => EncodedValue[]
  PerformTest: (
    this: void,
    testname: string,
    testData: unknown,
    testDictLocal?: EncodedValue[] | true,
    testDictGlobal?: EncodedValue[]
  ) => TestResult
}
