export interface ControlCharSpec {
  name: string
  length?: number
  decoder?: string
}

export type LdeValue = string | number

export type LuaTable = Record<string | number, unknown>

export type GlobalTable = Record<string, unknown>

export type LuaArray = unknown[]

export type OptionalNumber = number | undefined

export type LdeValueArray = LdeValue[]

export interface TestResult {
  testDictGlobal?: LdeValue[]
  encoded?: string[]
  decoded?: unknown
  dict?: LdeValue[]
  result?: boolean
  encoder?: EncodeInstance
  decoder?: DecodeInstance
}

export interface DictionaryInstance {
  globalDictReverse: LuaTable
  dictionary: LdeValue[]
  counts: [LuaTable, LuaTable, LuaTable]
  Initialize: (this: DictionaryInstance, data: unknown, globalDictionary?: LdeValue[]) => void
  ScanTable: (this: DictionaryInstance, data: unknown) => void
  ValidateValue: (this: DictionaryInstance, value: unknown) => boolean
  IncreaseCount: (this: DictionaryInstance, value: LdeValue) => void
  [key: string]: unknown
}

export interface DictionaryClass {
  Subclass: (this: DictionaryClass) => DictionaryClass
  New: (this: DictionaryClass, data: unknown, globalDictionary?: LdeValue[]) => DictionaryInstance
  Initialize: (this: DictionaryInstance, data: unknown, globalDictionary?: LdeValue[]) => void
  ScanTable: (this: DictionaryInstance, data: unknown) => void
  ValidateValue: (this: DictionaryInstance, value: unknown) => boolean
  IncreaseCount: (this: DictionaryInstance, value: LdeValue) => void
  [key: string]: unknown
}

export interface EncodeInstance {
  data: unknown
  encodedStrings: string[]
  currentString: string
  currentStringLength: number
  globalDictionary: LdeValue[] | undefined
  dictionary: LdeValue[]
  reverseDictionary: LuaTable | undefined
  Initialize: (
    this: EncodeInstance,
    data: unknown,
    localDictionary?: LdeValue[] | true,
    globalDictionary?: LdeValue[]
  ) => void
  InitDictionary: (this: EncodeInstance, localDictionary: LdeValue[] | true) => void
  MakeReverseDictionary: (this: EncodeInstance) => void
  AddString: (this: EncodeInstance, str: string) => void
  AddInteger: (this: EncodeInstance, integer: number) => void
  NewLine: (this: EncodeInstance) => void
  EncodeDictionary: (this: EncodeInstance, dictionary: LdeValue[]) => void
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
    localDictionary?: LdeValue[] | true,
    globalDictionary?: LdeValue[]
  ) => EncodeInstance
  Initialize: (
    this: EncodeInstance,
    data: unknown,
    localDictionary?: LdeValue[] | true,
    globalDictionary?: LdeValue[]
  ) => void
  InitDictionary: (this: EncodeInstance, localDictionary: LdeValue[] | true) => void
  MakeReverseDictionary: (this: EncodeInstance) => void
  AddString: (this: EncodeInstance, str: string) => void
  AddInteger: (this: EncodeInstance, integer: number) => void
  NewLine: (this: EncodeInstance) => void
  EncodeDictionary: (this: EncodeInstance, dictionary: LdeValue[]) => void
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
  dictionary: LdeValue[]
  data: unknown
  Initialize: (
    this: DecodeInstance,
    encodedData: readonly string[],
    globalDict?: LdeValue[]
  ) => void
  InitDictionary: (this: DecodeInstance, globalDict?: LdeValue[]) => void
  GetCurrentString: (this: DecodeInstance) => string | undefined
  GetNextChar: (this: DecodeInstance, noPosIncrement?: boolean) => string
  GetEncodedItem: (this: DecodeInstance, length?: number) => string
  MoveCurrentPos: (this: DecodeInstance, offset: number) => void
  DecodeItem: (this: DecodeInstance) => unknown
  DecodeBool: (this: DecodeInstance, controlChar: string) => boolean | undefined
  DecodeStringId: (this: DecodeInstance, controlChar: string) => LdeValue
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
    globalDict?: LdeValue[]
  ) => DecodeInstance
  Initialize: (
    this: DecodeInstance,
    encodedData: readonly string[],
    globalDict?: LdeValue[]
  ) => void
  InitDictionary: (this: DecodeInstance, globalDict?: LdeValue[]) => void
  GetCurrentString: (this: DecodeInstance) => string | undefined
  GetNextChar: (this: DecodeInstance, noPosIncrement?: boolean) => string
  GetEncodedItem: (this: DecodeInstance, length?: number) => string
  MoveCurrentPos: (this: DecodeInstance, offset: number) => void
  DecodeItem: (this: DecodeInstance) => unknown
  DecodeBool: (this: DecodeInstance, controlChar: string) => boolean | undefined
  DecodeStringId: (this: DecodeInstance, controlChar: string) => LdeValue
  DecodeBase: (this: DecodeInstance, encodedItem: string) => number
  DecodeString: (this: DecodeInstance, controlChar: string) => string
  DecodeArray: (this: DecodeInstance) => unknown[]
  DecodeTable: (this: DecodeInstance) => LuaTable
  DecodeInteger: (this: DecodeInstance) => number
  DecodeNumeric: (this: DecodeInstance) => number | undefined
  [key: string]: unknown
}

export interface LibSurface {
  name: string
  shortName: string
  version: string
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
    localDict?: LdeValue[] | true,
    globalDict?: LdeValue[]
  ) => string[]
  Decode: <T = unknown>(
    this: void,
    encodedData: readonly string[],
    globalDict?: LdeValue[]
  ) => LuaMultiReturn<[T, LdeValue[]]>
  MakeDictionary: (this: void, data: unknown, globalDictionary?: LdeValue[]) => LdeValue[]
  PerformTest: (
    this: void,
    testname: string,
    testData: unknown,
    testDictLocal?: LdeValue[] | true,
    testDictGlobal?: LdeValue[]
  ) => TestResult
}
