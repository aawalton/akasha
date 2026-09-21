const LSB_STRINGS: Record<string, string> = {
  LIBSHIFTERBOX_ALLREADY_LOADED: "Is already loaded",
  LIBSHIFTERBOX_EMPTY: "empty",
  LIBSHIFTERBOX_DRAG_MULTIPLE: " and <<1[no further rows/1 further row/$d further rows]>>",
}

export function registerLibShifterBoxStrings(this: void): undefined {
  for (const [key, value] of pairs(LSB_STRINGS)) {
    ZO_CreateStringId(key, value)
    SafeAddVersion(key, 1)
  }
}
