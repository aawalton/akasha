declare function GetGameTimeMilliseconds(this: void): number

export const performance = {
  now: (): number => GetGameTimeMilliseconds(),
}
