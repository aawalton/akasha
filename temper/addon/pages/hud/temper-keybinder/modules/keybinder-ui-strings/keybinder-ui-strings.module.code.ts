const UI_STRINGS: Readonly<Record<string, string>> = {
  ACCOUNTWIDE: "Use account-wide, as default and as template for new characters.",
  TOGGLE: "De-/Select All",
}

export function getUiString(this: void, key: string): string {
  return UI_STRINGS[key] ?? ""
}
