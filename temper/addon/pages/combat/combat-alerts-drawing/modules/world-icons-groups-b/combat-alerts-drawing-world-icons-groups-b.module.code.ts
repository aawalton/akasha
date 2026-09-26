import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import {
  getAGIconsSize,
  getChimeraIconsSize,
  getOCIconsSize,
  getOrphicIconSize,
  type WorldIconGroup,
} from "akasha/temper/addon/pages/combat/combat-alerts-drawing/modules/world-icons-sizes/combat-alerts-drawing-world-icons-sizes.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const WORLD_ICON_GROUPS_B: Record<string, WorldIconGroup> = {
  OCMiddle: {
    size: getOCIconsSize,
    icons: [
      { x: 105400, y: 26157, z: 130300, texture: "TemperCombat/assets/shape/diamond_orange.dds" },
      { x: 105750, y: 26157, z: 130050, texture: "TemperCombat/assets/shape/diamond_orange_1.dds" },
      { x: 105750, y: 26157, z: 130550, texture: "TemperCombat/assets/shape/diamond_orange_2.dds" },
      { x: 106250, y: 26157, z: 130050, texture: "TemperCombat/assets/shape/diamond_orange_3.dds" },
      { x: 106250, y: 26157, z: 130550, texture: "TemperCombat/assets/shape/diamond_orange_4.dds" },
      { x: 104800, y: 26157, z: 130300, texture: "TemperCombat/assets/shape/diamond_blue.dds" },
      { x: 104450, y: 26157, z: 130050, texture: "TemperCombat/assets/shape/diamond_blue_1.dds" },
      { x: 104450, y: 26157, z: 130550, texture: "TemperCombat/assets/shape/diamond_blue_2.dds" },
      { x: 103950, y: 26157, z: 130050, texture: "TemperCombat/assets/shape/diamond_blue_3.dds" },
      { x: 103950, y: 26157, z: 130550, texture: "TemperCombat/assets/shape/diamond_blue_4.dds" },
    ],
  },
  OrphicDirections: {
    size: getOrphicIconSize,
    icons: [
      {
        x: 151041,
        y: 22880,
        z: 86169,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.RED,
        text: "NE",
        faceCamera: true,
      },
      {
        x: 151169,
        y: 22880,
        z: 89708,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.RED,
        text: "SE",
        faceCamera: true,
      },
      {
        x: 147477,
        y: 22880,
        z: 89756,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.RED,
        text: "SW",
        faceCamera: true,
      },
      {
        x: 147488,
        y: 22880,
        z: 86178,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.RED,
        text: "NW",
        faceCamera: true,
      },
    ],
  },
  OrphicDirectionsVet: {
    size: getOrphicIconSize,
    icons: [
      {
        x: 149348,
        y: 22880,
        z: 85334,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "N",
        faceCamera: true,
      },
      {
        x: 151956,
        y: 22880,
        z: 87950,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "E",
        faceCamera: true,
      },
      {
        x: 149272,
        y: 22880,
        z: 90657,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "S",
        faceCamera: true,
      },
      {
        x: 146628,
        y: 22880,
        z: 87851,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "W",
        faceCamera: true,
      },
    ],
  },
  AGExecute: {
    size: getAGIconsSize,
    icons: [
      {
        x: 75001,
        y: 54955,
        z: 69670,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "N",
      },
      {
        x: 75380,
        y: 54955,
        z: 70000,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "E",
      },
      {
        x: 75001,
        y: 54955,
        z: 70320,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "S",
      },
      {
        x: 74630,
        y: 54955,
        z: 70000,
        texture: "TemperCombat/assets/shape/circle.dds",
        color: C.BLUE,
        text: "W",
      },
      { x: 75590, y: 54919, z: 69410, texture: "TemperCombat/assets/shape/diamond_orange_1.dds" },
      { x: 75590, y: 54919, z: 70590, texture: "TemperCombat/assets/shape/diamond_orange_2.dds" },
      { x: 74410, y: 54919, z: 70590, texture: "TemperCombat/assets/shape/diamond_red_2.dds" },
      { x: 74410, y: 54919, z: 69410, texture: "TemperCombat/assets/shape/diamond_red_1.dds" },
    ],
  },
  SEChimeraHMGryphon: {
    size: getChimeraIconsSize,
    icons: [
      { x: 172091, y: 40350, z: 238068, text: "1", faceCamera: true },
      { x: 172123, y: 40350, z: 242163, text: "2", faceCamera: true },
      { x: 170049, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 168007, y: 40350, z: 242182, text: "4", faceCamera: true },
      { x: 168000, y: 40350, z: 238103, text: "5", faceCamera: true },
    ],
  },
  SEChimeraHMLion: {
    size: getChimeraIconsSize,
    icons: [
      { x: 182032, y: 40350, z: 238069, text: "1", faceCamera: true },
      { x: 182042, y: 40350, z: 242188, text: "2", faceCamera: true },
      { x: 179982, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 177970, y: 40350, z: 242203, text: "4", faceCamera: true },
      { x: 177955, y: 40350, z: 238088, text: "5", faceCamera: true },
    ],
  },
  SEChimeraHMWamasu: {
    size: getChimeraIconsSize,
    icons: [
      { x: 191961, y: 40350, z: 238086, text: "1", faceCamera: true },
      { x: 191969, y: 40350, z: 242178, text: "2", faceCamera: true },
      { x: 189909, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 187824, y: 40350, z: 242171, text: "4", faceCamera: true },
      { x: 187852, y: 40350, z: 238106, text: "5", faceCamera: true },
    ],
  },
  SEChimeraVetGryphon: {
    size: getChimeraIconsSize,
    icons: [
      { x: 170065, y: 40350, z: 237908, text: "1", faceCamera: true },
      { x: 172289, y: 40350, z: 240133, text: "2", faceCamera: true },
      { x: 170051, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 167843, y: 40350, z: 240125, text: "4", faceCamera: true },
    ],
  },
  SEChimeraVetLion: {
    size: getChimeraIconsSize,
    icons: [
      { x: 179984, y: 40350, z: 237903, text: "1", faceCamera: true },
      { x: 182228, y: 40350, z: 240155, text: "2", faceCamera: true },
      { x: 179982, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 177792, y: 40350, z: 240115, text: "4", faceCamera: true },
    ],
  },
  SEChimeraVetWamasu: {
    size: getChimeraIconsSize,
    icons: [
      { x: 189900, y: 40350, z: 237900, text: "1", faceCamera: true },
      { x: 192115, y: 40350, z: 240117, text: "2", faceCamera: true },
      { x: 189909, y: 40350, z: 242334, text: "3", faceCamera: true },
      { x: 187671, y: 40350, z: 240128, text: "4", faceCamera: true },
    ],
  },
  SEChimeraNormGryphon: {
    size: getChimeraIconsSize,
    icons: [
      { x: 172123, y: 40350, z: 242163, text: "1", faceCamera: true },
      { x: 170049, y: 40350, z: 242334, text: "2", faceCamera: true },
      { x: 168007, y: 40350, z: 242182, text: "3", faceCamera: true },
    ],
  },
  SEChimeraNormLion: {
    size: getChimeraIconsSize,
    icons: [
      { x: 182042, y: 40350, z: 242188, text: "1", faceCamera: true },
      { x: 179982, y: 40350, z: 242334, text: "2", faceCamera: true },
      { x: 177970, y: 40350, z: 242203, text: "3", faceCamera: true },
    ],
  },
  SEChimeraNormWamasu: {
    size: getChimeraIconsSize,
    icons: [
      { x: 191969, y: 40350, z: 242178, text: "1", faceCamera: true },
      { x: 189909, y: 40350, z: 242334, text: "2", faceCamera: true },
      { x: 187824, y: 40350, z: 242171, text: "3", faceCamera: true },
    ],
  },
}
