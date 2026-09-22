import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function registerUnknownLinkString(this: void): undefined {
  ZO_CreateStringId(
    "TEMPER_CHATMESSAGE_UNKNOWN_DESCRIPTION",
    'The chat link "<<1>>" is currently not supported.'
  )
}
