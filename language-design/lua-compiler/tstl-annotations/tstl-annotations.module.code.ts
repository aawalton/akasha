import * as ts from "typescript"

export const AnnotationKind = {
  CustomConstructor: "customConstructor",
  CompileMembersOnly: "compileMembersOnly",
  NoResolution: "noResolution",
  NoSelf: "noSelf",
  CustomName: "customName",
  NoSelfInFile: "noSelfInFile",
} as const
export type AnnotationKind = (typeof AnnotationKind)[keyof typeof AnnotationKind]

const annotationValues = new Map(Object.values(AnnotationKind).map((k) => [k.toLowerCase(), k]))

export interface Annotation {
  kind: AnnotationKind
  args: readonly string[]
}

export type AnnotationsMap = Map<AnnotationKind, Annotation>

function collectAnnotations(
  source: ts.Symbol | ts.Signature,
  annotationsMap: AnnotationsMap
): undefined {
  for (const tag of source.getJsDocTags()) {
    const tagName = annotationValues.get(tag.name.toLowerCase())
    if (tagName == null) continue
    const annotation: Annotation = {
      kind: tagName,
      args: tag.text?.map((p) => p.text) ?? [],
    }
    annotationsMap.set(tagName, annotation)
  }
}

const symbolAnnotations = new WeakMap<ts.Symbol, AnnotationsMap>()

export function getSymbolAnnotations(symbol: ts.Symbol): AnnotationsMap {
  const known = symbolAnnotations.get(symbol)
  if (known) return known

  const annotationsMap: AnnotationsMap = new Map()
  collectAnnotations(symbol, annotationsMap)

  symbolAnnotations.set(symbol, annotationsMap)
  return annotationsMap
}

export function getTypeAnnotations(type: ts.Type): AnnotationsMap {
  const annotationsMap: AnnotationsMap = new Map()
  if (type.symbol) {
    getSymbolAnnotations(type.symbol).forEach((value, key) => {
      annotationsMap.set(key, value)
    })
  }
  if (type.aliasSymbol) {
    getSymbolAnnotations(type.aliasSymbol).forEach((value, key) => {
      annotationsMap.set(key, value)
    })
  }
  return annotationsMap
}

const nodeAnnotations = new WeakMap<ts.Node, AnnotationsMap>()
export function getNodeAnnotations(node: ts.Node): AnnotationsMap {
  const known = nodeAnnotations.get(node)
  if (known) return known

  const annotationsMap: AnnotationsMap = new Map()
  collectAnnotationsFromTags(annotationsMap, ts.getAllJSDocTags(node, ts.isJSDocUnknownTag))

  nodeAnnotations.set(node, annotationsMap)
  return annotationsMap
}

function collectAnnotationsFromTags(annotationsMap: AnnotationsMap, tags: readonly ts.JSDocTag[]) {
  for (const tag of tags) {
    const tagName = annotationValues.get(tag.tagName.text.toLowerCase())
    if (tagName == null) continue
    annotationsMap.set(tagName, { kind: tagName, args: getTagArgsFromComment(tag) })
  }
}

const fileAnnotations = new WeakMap<ts.SourceFile, AnnotationsMap>()
export function getFileAnnotations(sourceFile: ts.SourceFile): AnnotationsMap {
  const known = fileAnnotations.get(sourceFile)
  if (known) return known

  const annotationsMap: AnnotationsMap = new Map()

  const firstStatement = sourceFile.statements[0]
  if (firstStatement !== undefined) {
    const jsDoc = firstStatement.jsDoc
    if (jsDoc) {
      for (const jsDocElement of jsDoc) {
        if (jsDocElement.tags) {
          collectAnnotationsFromTags(annotationsMap, jsDocElement.tags)
        }
      }
    }
  }

  fileAnnotations.set(sourceFile, annotationsMap)
  return annotationsMap
}

function getTagArgsFromComment(tag: ts.JSDocTag): readonly string[] {
  if (tag.comment != null) {
    if (typeof tag.comment === "string") {
      const firstLine = tag.comment.split("\n")[0]
      if (firstLine === undefined) return []
      return firstLine.trim().split(" ")
    } else {
      return tag.comment.map((part) => part.text)
    }
  }

  return []
}
