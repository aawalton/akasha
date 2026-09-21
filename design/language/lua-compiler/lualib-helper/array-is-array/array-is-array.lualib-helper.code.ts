import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

type NextEmptyCheck = (this: void, table: any, index?: undefined) => unknown | undefined
function NextEmptyCheck(f: typeof next): NextEmptyCheck {
  return f as NextEmptyCheck
}

export function __TS__ArrayIsArray(this: void, value: any): value is any[] {
  return type(value) === "table" && (1 in value || NextEmptyCheck(next)(value) === undefined)
}
