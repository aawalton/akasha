import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const folderGrouping = {
  id: "01a076d1-2008-7e68-acfc-f5b939d07cc3",
  type: "page-type/module",
  slug: "folder-grouping",
  definition: "the folders a path sits under, and what a change leaves sitting in a folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders above a path are answered from the nearest folder outward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files in a folder are what the listing handed in lists there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check hands in the shadow, and an audit hands in the files the commit carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders under a folder are worked out once from every file that listing has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a change takes away is dropped from the folder that path sat in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder a change opens is answered under the folder above that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An uncommitted file opens no folder, so a folder holding only those is no folder here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a file is still among the files of the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder a change leaves holding no file and no folder is no folder here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder is holding nothing where every folder under it is holding nothing too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is held for the folder that answer was asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a generator writes sits in no folder here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a generator writes is answered by the caller rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each folder a declared file name sits under is a segment of that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder is such a segment only where the file that name gives sits under that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a subfolder is no such segment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a file no declared name gives is no such segment.",
    },
  ],
} as const satisfies Module
