import "akasha/temper/addon/type/lib-sets/lib-sets.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-constant-shapes/lib-sets-constant-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings/eso-lib-sets-strings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"

const CLASS_DATA: LibSetsClassData = {
  index2Id: {},
  id2Index: {},
  names: {},
  icons: {},
  colors: {},
  setsList: {},
}
for (let i = 1; i <= GetNumClasses(); i++) {
  const [classId] = GetClassInfo(i)
  if (classId !== undefined) {
    const classIndex = GetClassIndexById(classId)
    if (classIndex !== undefined) {
      CLASS_DATA.index2Id[classIndex] = classId
      CLASS_DATA.id2Index[classId] = classIndex
    }
    CLASS_DATA.names[classId] = zo_strformat(SI_CLASS_NAME, GetClassName(GENDER_MALE, classId))
    CLASS_DATA.icons[classId] = ZO_GetClassIcon(classId)
    CLASS_DATA.colors[classId] = GetClassColor(classId)
  }
}
lib.classData = CLASS_DATA
