interface GroupBroadcastNumericFieldOptions {
  minValue?: number
  maxValue?: number
  numBits?: number
  precision?: number
}

interface GroupBroadcastField {
  readonly fieldName: string
}

interface GroupBroadcastFinalizeOptions {
  isRelevantInCombat?: boolean
  replaceQueuedMessages?: boolean
}

interface GroupBroadcastProtocol {
  AddField: (this: GroupBroadcastProtocol, field: GroupBroadcastField) => void
  OnData: (
    this: GroupBroadcastProtocol,
    callback: (this: void, unitTag: string, data: Readonly<Record<string, number>>) => void
  ) => void
  Finalize: (this: GroupBroadcastProtocol, options?: GroupBroadcastFinalizeOptions) => boolean
  Send: (this: GroupBroadcastProtocol, payload: Record<string, number>) => void
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
}

declare const LibGroupBroadcast: GroupBroadcastLibrary | undefined
