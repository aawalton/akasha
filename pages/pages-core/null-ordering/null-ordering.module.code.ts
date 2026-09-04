export function nullOrderSign(nullIsLeft: boolean, desc: boolean): -1 | 1 {
  return nullIsLeft === desc ? 1 : -1
}
