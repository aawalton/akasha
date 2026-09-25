export const ESO_STRIPPED_GLOBALS = [
  "dofile",
  "gcinfo",
  "load",
  "loadfile",
  "loadstring",
  "module",
  "rawlen",
  "require",
  "warn",
] as const

export const ESO_WHOLLY_STRIPPED_NAMESPACES = ["bit", "bit32", "io", "package"] as const

export const ESO_AVAILABLE_COROUTINE = [
  "create",
  "getname",
  "resume",
  "running",
  "setname",
  "status",
  "wrap",
  "yield",
] as const

export const ESO_AVAILABLE_DEBUG = ["traceback"] as const

export const ESO_AVAILABLE_MATH = [
  "abs",
  "acos",
  "asin",
  "atan",
  "atan2",
  "ceil",
  "cos",
  "cosh",
  "deg",
  "exp",
  "floor",
  "fmod",
  "frexp",
  "huge",
  "ldexp",
  "log",
  "log10",
  "max",
  "min",
  "mod",
  "modf",
  "pi",
  "pow",
  "rad",
  "random",
  "randomseed",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
] as const

export const ESO_AVAILABLE_OS = [
  "clock",
  "clockpersecond",
  "date",
  "difftime",
  "rawclock",
  "time",
] as const

export const ESO_AVAILABLE_STRING = [
  "byte",
  "char",
  "find",
  "format",
  "gfind",
  "gmatch",
  "gsub",
  "len",
  "lower",
  "lowerbybyte",
  "match",
  "rep",
  "reverse",
  "sub",
  "upper",
  "upperbybyte",
] as const

export const ESO_AVAILABLE_TABLE = [
  "concat",
  "create",
  "foreach",
  "foreachi",
  "getn",
  "insert",
  "maxn",
  "remove",
  "sort",
] as const

export const ESO_AVAILABLE_UTF8 = ["charpattern", "codepoint", "codes", "len", "offset"] as const
