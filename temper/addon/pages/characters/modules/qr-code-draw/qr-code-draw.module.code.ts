import { qrcode } from "akasha/temper/addon/pages/characters/modules/qr-code-encode/qr-code-encode.module.code.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function pixelSize(
  this: void,
  parentX: number,
  parentY: number,
  rowCount: number,
  colCount: number
): number {
  const pxX = parentX / (colCount + 2)
  const pxY = parentY / (rowCount + 2)
  const pxSize = Math.min(pxX, pxY)
  return Math.floor(pxSize * 2) / 2
}

function drawStrip(
  this: void,
  composite: TextureCompositeControl,
  surfaceNum: number,
  left: number,
  right: number,
  top: number,
  bottom: number
): undefined {
  composite.AddSurface(left, right, top, bottom)
  composite.SetInsets(surfaceNum, left, right, top, bottom)
  composite.SetColor(surfaceNum, 0, 0, 0, 1)
}

function compositeFor(this: void, control: TextureControl): TextureCompositeControl {
  const named: string | undefined = control.GetName()
  const compositeName = `${named ?? "Default"}QRComposite`
  const existing = WINDOW_MANAGER.GetControlByName<TextureCompositeControl>(compositeName)
  if (existing === undefined) {
    const created = WINDOW_MANAGER.CreateControl(
      compositeName,
      control,
      CT_TEXTURECOMPOSITE as CtControl
    )
    return created as TextureCompositeControl
  }
  existing.ClearAllSurfaces()
  return existing
}

function drawWithCompositeTexture(
  this: void,
  control: TextureControl,
  qrTable: readonly (readonly number[])[]
): undefined {
  const composite = compositeFor(control)
  composite.SetParent(control)
  composite.SetDrawTier(control.GetDrawTier())
  composite.SetDrawLayer(DL_OVERLAY)
  composite.SetPixelRoundingEnabled(false)

  const rowCount = qrTable.length
  const colCount = (qrTable[0] ?? []).length
  const [parentX, parentY] = control.GetDimensions()
  const pxSize = pixelSize(parentX, parentY, rowCount, colCount)
  const yOffset = (parentY - pxSize * rowCount) / 2
  const xOffset = (parentX - pxSize * colCount) / 2
  composite.SetAnchor(TOPLEFT, control, TOPLEFT, xOffset, yOffset)
  composite.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, -xOffset, -yOffset)
  control.SetColor(1, 1, 1, 1)

  const width = composite.GetWidth()
  const height = composite.GetHeight()
  let surfaceNum = 1
  for (let rowNum = 1; rowNum <= rowCount; rowNum++) {
    const row = qrTable[rowNum - 1] ?? []
    const top = (rowNum - 1) * pxSize
    const bottom = top - height + pxSize
    let left: number | undefined
    for (let colNum = 1; colNum <= row.length; colNum++) {
      if ((row[colNum - 1] ?? 0) > 0) {
        if (left === undefined) left = (colNum - 1) * pxSize
      } else {
        if (left !== undefined) {
          const right = (colNum - 1) * pxSize - width
          drawStrip(composite, surfaceNum, left, right, top, bottom)
          surfaceNum += 1
        }
        left = undefined
      }
    }
    if (left !== undefined) {
      drawStrip(composite, surfaceNum, left, 0, top, bottom)
      surfaceNum += 1
    }
  }
}

export function drawQRCode(this: void, control: TextureControl, data: string): undefined {
  if (control.GetType() !== CT_TEXTURE) {
    throw `Expected a ControlTexture (Type=${CT_TEXTURE}), but found Type=${control.GetType()}`
  }
  const [ok, qrTable] = qrcode(data, 2)
  if (ok) {
    drawWithCompositeTexture(control, qrTable)
  } else {
    d("failed to generate qr code from input data")
  }
}
