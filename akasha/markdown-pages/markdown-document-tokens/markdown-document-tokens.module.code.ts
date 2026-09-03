import type {
  Cardinality,
  Ceiling,
} from "../markdown-document-shape/markdown-document-shape.module.code.ts"

const ceiling = (n: number): Ceiling => n as Ceiling

export const SIZE_XS = ceiling(50)
export const SIZE_SM = ceiling(100)
export const SIZE_MD = ceiling(200)
export const SIZE_LG = ceiling(500)
export const SIZE_XL = ceiling(1000)
export const SIZE_2XL = ceiling(2000)
export const SIZE_3XL = ceiling(5000)

export const once: Cardinality = { least: 1, max: 1 }
export const optional: Cardinality = { least: 0, max: 1 }
