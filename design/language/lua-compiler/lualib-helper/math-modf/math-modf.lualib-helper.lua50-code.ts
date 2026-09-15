export function __TS__MathModf(this: void, x: number): LuaMultiReturn<[number, number]> {
  const integral = x > 0 ? Math.floor(x) : Math.ceil(x)
  return $multi(integral, x - integral)
}
