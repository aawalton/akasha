interface GroupBroadcastNumericFieldOptions {
  minValue?: number
  maxValue?: number
  numBits?: number
  precision?: number
  trimValues?: boolean
}

interface GroupBroadcastStringFieldOptions {
  minLength?: number
  maxLength?: number
}

interface GroupBroadcastField {
  readonly fieldName: string
}

interface GroupBroadcastFinalizeOptions {
  isRelevantInCombat?: boolean
  replaceQueuedMessages?: boolean
}

type GroupBroadcastData = Readonly<Record<string, number | string | boolean | undefined>>

interface GroupBroadcastProtocol {
  AddField: (this: GroupBroadcastProtocol, field: GroupBroadcastField) => void
  OnData: (
    this: GroupBroadcastProtocol,
    callback: (this: void, unitTag: string, data: Readonly<Record<string, number>>) => void
  ) => void
  Finalize: (this: GroupBroadcastProtocol, options?: GroupBroadcastFinalizeOptions) => boolean
  Send: (this: GroupBroadcastProtocol, payload: GroupBroadcastData) => void
}

interface GroupBroadcastHandler {
  SetDisplayName: (this: GroupBroadcastHandler, name: string) => void
  SetDescription: (this: GroupBroadcastHandler, description: string) => void
  DeclareProtocol: (this: GroupBroadcastHandler, id: number, name: string) => GroupBroadcastProtocol
}

interface GroupBroadcastLibrary {
  RegisterHandler: (this: GroupBroadcastLibrary, name: string) => GroupBroadcastHandler
  CreateNumericField: (
    this: void,
    label: string,
    options?: GroupBroadcastNumericFieldOptions
  ) => GroupBroadcastField
  CreateFlagField: (this: void, label: string) => GroupBroadcastField
  CreateStringField: (
    this: void,
    label: string,
    options?: GroupBroadcastStringFieldOptions
  ) => GroupBroadcastField
  CreateOptionalField: (this: void, field: GroupBroadcastField) => GroupBroadcastField
}

declare const LibGroupBroadcast: GroupBroadcastLibrary | undefined
