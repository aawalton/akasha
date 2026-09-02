export const ERROR_INVALID_TYPE = "Invalid argument type"
export const ERROR_HAS_NO_PARENT = "Command does not have a parent"
export const ERROR_ALREADY_HAS_PARENT = "Command already has a parent"
export const ERROR_CIRCULAR_HIERARCHY = "Circular hierarchy detected"
export const ERROR_AUTOCOMPLETE_NOT_ACTIVE = "Tried to get autocomplete results while it's disabled"
export const ERROR_AUTOCOMPLETE_RESULT_NOT_VALID =
  "Autocomplete provider returned invalid result type"
export const ERROR_CALLED_WITHOUT_CALLBACK = "Tried to call command while no callback is set"
export const WARNING_ALREADY_HAS_ALIAS = "Warning: Overwriting existing command alias '%s'"

export const COMMAND_TYPE_BUILT_IN = 1
export const COMMAND_TYPE_CHAT_SWITCH = 2
export const COMMAND_TYPE_EMOTE = 3
export const COMMAND_TYPE_ADDON = 4

export const TYPE_COLOR: Record<number, string> = {
  [COMMAND_TYPE_BUILT_IN]: "|c87C180",
  [COMMAND_TYPE_CHAT_SWITCH]: "|cD8D891",
  [COMMAND_TYPE_EMOTE]: "|c88A1CC",
  [COMMAND_TYPE_ADDON]: "|cEC9746",
}
